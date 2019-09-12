// listener functions for asynchronous actions like email
var broadcaster = require('broadcaster');
var awsSes = require('../utils/awsSes');
var dslog = require('../utils/dslog');
var serverConfigs = require('../configs/serverConfigs');
var emailConfigs = require('../configs/emailConfigs');
var _ = require('lodash');
var handlebars = require('handlebars');
var fs = require('fs');
var path=require('path');

var emailList = {};

// returns the html for the body
function getBodyTemplate(bodyTemplate) {
    return (fs.readFileSync(path.join(__dirname, emailConfigs.templatePath+bodyTemplate), "utf8"));
}

// load the email configs, precompile the templates in handlebars and have it ready for generating html
function init() {
    var headerTemplate = fs.readFileSync(path.join(__dirname, emailConfigs.templatePath+'/header.html'), "utf8");
    var footerTemplate = fs.readFileSync(path.join(__dirname, emailConfigs.templatePath+'/footer.html'), "utf8");
    var indexTemplate = fs.readFileSync(path.join(__dirname, emailConfigs.templatePath+'/index.html'), "utf8");

    // register the partials
    handlebars.registerPartial('emailHeader', headerTemplate);
    handlebars.registerPartial('emailFooter', footerTemplate);

    _.map(emailConfigs.emailList, function(item){
        if (item.template) {
            // note each of the email partials have to be registered
            handlebars.registerPartial(item.name, getBodyTemplate(item.template));
            // compile the template
            item.compiledTemplate = handlebars.compile(indexTemplate);
            emailList[item.name] = item;
        } else {
            dslog.error('email::emailSender - template not defined for '+item.title);
        }
    });
}

function prepareSubjectLine(subjectLine,emailData) {
    // compile the subject line
    var compiledLine = handlebars.compile(subjectLine);
    return compiledLine(emailData);
}

// common function to send email
// emailName should match the 'name' attribute in emailConfigs
// emailData contains all the optional data required by the controller
function sendEmail(emailName,emailData) {
    var emailObj = emailList[emailName];
    if (emailObj) {
        var emailInformation = {}
        // add domain,title for the template
        emailInformation.domain = serverConfigs.runTimeConfig[global.env].destUrl;
        //emailInformation.domain = serverConfigs.runTimeConfig['test'].destUrl;
        emailInformation.subject = emailObj.subject;
        emailInformation.title = emailObj.title;
        // footer links
        emailInformation.termsLink = serverConfigs.runTimeConfig['test'].destUrl+emailConfigs.termsLink;
        emailInformation.privacyLink = serverConfigs.runTimeConfig['test'].destUrl+emailConfigs.privacyLink;
        var emailInfoFromController = emailControllers(emailObj.controller)(emailObj,emailData);
        _.each(emailInfoFromController,function(value,key){
            emailInformation[key] = value
        });
        // build the html with the data
        emailInformation.body = emailObj.compiledTemplate(emailInformation);
        // ignore email from facebook test accounts
        if (emailInformation.to.indexOf('tfbnw.net') == -1) {
            awsSes.sendEmail(emailInformation,function(err,result){
                dslog.info('Sending Email'+emailObj.title);
                if (err) {
                    dslog.error(err);
                } else {
                    dslog.info(result)
                }
            });
        } else {
            console.log('not sending email to tfbnw.net');
        }

    } else {
        dslog.error('email::emailSender - email configs not found');
    }
}

// ***** controllers for each of the email*****
// controller should return the complete data required for the template
function emailControllers(controllerName) {
    var controllers = {
        confirmEmailController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.confirmEmail = true;
            emailData.confirmEmailUrl = serverConfigs.runTimeConfig[global.env].destUrl+'/#/vrfm/email/'+emailData.accountId+'//'+emailData.resetKey;
            return emailData;
        },
        registrationConfirmationController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.registrationConfirmation = true;
            return emailData;
        },
        resetPasswordController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.resetPassword = true;
            emailData.resetPasswordUrl = serverConfigs.runTimeConfig[global.env].destUrl+'/#/rspm/2/'+emailData.to+'/'+emailData.resetKey;
            return emailData;
        },
        inviteToInnerCircleController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.inviteToInnerCircle = true;
            // overwrite the subject by replacing the user name
            emailData.subject = prepareSubjectLine(emailObj.subject,emailData)
            // if invitee has account then send this url
            if (emailData.inviteeHasAccount) {
                emailData.invitationUrl = serverConfigs.runTimeConfig[global.env].destUrl+'/#/vrfm/accept/'+emailData.invitationId+'/'+emailData.userName+'/';
            } else {
                emailData.invitationUrl = serverConfigs.runTimeConfig[global.env].destUrl+'/#/lndm/signup/'+emailData.invitationId;
            }
            emailData.inviteeProfileUrl = serverConfigs.runTimeConfig[global.env].destUrl+emailConfigs.userProfileLinkForDating+emailData.userName;
            return emailData;
        },
        inviteFriendsController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.inviteFriends = true;
            emailData.invitationUrl = serverConfigs.runTimeConfig[global.env].destUrl+'/#/lndm/signup/'+emailData.invitationId;
            emailData.inviteeProfileUrl = serverConfigs.runTimeConfig[global.env].destUrl+emailConfigs.userProfileLinkForDating+emailData.userName;
            return emailData;
        },
        profileCompleteController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.profileComplete = true;
            emailData.dateUrl = serverConfigs.runTimeConfig[global.env].destUrl+emailConfigs.dateMatchesInCommunityLink;
            emailData.innerCircleUrl = serverConfigs.runTimeConfig[global.env].destUrl+emailConfigs.connectMyInnerCircleLink;
            return emailData;
        },
        addedToFavoritesController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.addedToFavorites = true;
            // note myUserName is the userName of person who added to favorites. The recipient of this email will want to see their profile
            emailData.profileUrl = serverConfigs.runTimeConfig[global.env].destUrl+emailConfigs.userProfileLinkForDating+emailData.myUserName;
            return emailData;
        },
        newMessageController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.newMessage = true;
            // note - myUserName is the userName who this target recipient is conversing with
            emailData.messageUrl = serverConfigs.runTimeConfig[global.env].destUrl+emailConfigs.connectMessageLink+emailData.myUserName;
            return emailData;
        },
        newSupportTicketController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.newSupportTicket = true;
            return emailData;
        },
        newSignUpNotificationController : function(emailObj,emailData) {
            // required to apply the appropriate template
            emailData.newSignUpNotification = true;
            return emailData;
        }
    }
    return controllers[controllerName];
}

// initialize the email functions
init();
broadcaster.on('email::sendEmail', sendEmail);