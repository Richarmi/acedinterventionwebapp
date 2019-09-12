// validator declaration for all models

// list all attributes in all models here
var constraints = {
    _id : {
        presence : true
    },
    userName : {
        presence : true,
        length : {
            minimum : 4,
            maximum : 15,
            tooShort : 'should have a minimum length of 6',
            tooLong : 'should not be more than 15 characters'
        },
        format : {
            pattern : '^[a-zA-Z0-9]+$',
            message : 'should contain only letters and numbers'
        }

    },
    email : {
        presence: true,
        email: {
            message: 'is not valid'
        }
    },
    password : function(value, attributes, attributeName, options, constraints) {
        if (attributes.authResponse && attributes.authResponse.accessToken) {
            //return presence is not required if accessToken from fb is present
            return {
                presence : false
            }
        } else {
            return { presence : true,
                length : {
                    minimum : 8,
                    tooShort : 'should have a minimum length of 8'
                }
            }
        }
    },
    emailForAuthentication : function (value,attributes,attributeName,options,constraints) {
        if (attributes.authResponse && attributes.authResponse.accessToken) {
            //return presence is not required if accessToken from fb is present
            return {
                presence : false
            }
        } else {
            return {
                presence: true,
                email: {
                    message: 'is not valid'
                }
            }
        }
    },
    authResponse : function (value,attributes,attributeName,options,constraints) {
        if (attributes.password) {
            //check for presence of the attributes
            return {presence: false}
        } else {
            return { presence : true}
        }

    },
    age : {
        presence : true,
        numericality : {
            onlyInteger: true,
            greaterThanOrEqualTo: 18,
            lessThanOrEqualTo: 99,
            message : 'should be between 18 and 99'
        }
    },
    loginMethod : {
        presence : true,
        inclusion: {
            within: ['wovo','facebook'],
            message: "has to be wovo or facebook"
        }
    },
    mobileNumber : {
        presence : true,
        length : {
            is : 10,
            wrongLength : 'is not 10 digits'
        },
        format : {
            pattern : '/^[2-9]{1}[0-9]{9}$/',
            message : 'is not valid'
        }
    },
    firstName : {
        presence : true
    },
    lastName : {
        presence : true
    },
    subject : {
        presence : true
    },
    location:{
        presence : true
    },
    totalObservationTime : {
        presence : true,
        numericality : {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
            lessThanOrEqualTo: 9999999,
            message : 'should be numeric and greater than zero'
        }
    },
    gender : {
        presence : true,
        inclusion: {
            within: ['male','female'],
            message: "has to be male or female"
        }
    },
    zipCode : {
        presence : true,
        length : {
            is : 5,
            wrongLength : 'is not 5 digits'
        },
        format : {
            pattern : '^[0-9]{5}(-[0-9]{4})?$',
            message : 'is not valid'
        }
    },
    agreeToTerms : {
        presence : true,
        inclusion: {
            within: [true,false],
            message: "has to be true or false"
        }
    },
    resetKey : {
        presence : true
    },
    pictureUploaded : {
        presence : true
    },
    publicId : {
        presence : true
    },
    url : {
        presence : true
    },
    cloudinaryResult : {
        presence : true
    },
    replaceWithPublicId : {
        presence : true
    },
    deletePublicId : {
        presence : false
    },
    stepsCompleted : {
        presence : true,
        numericality : {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
            lessThanOrEqualTo: 3,
            message : 'should be between 0 and 3'
        }
    },
    profileActive : {
        presence : true
    },
    attributeType : {
        presence : true,
        inclusion :['like','dislike']
    },
    genderInterestedIn : {
        presence : true,
        inclusion :['Men','Women','Both']
    },
    supportCategory : {
        presence : true,
        inclusion :['Technical Support','Feedback']
    },
    personType : {
        presence : true,
        inclusion :["team","student"]
    },
    invitationStatus : {
        presence : true,
        inclusion : ["invited","accepted"]
    },
    invitationFilter : {
        presence : true,
        inclusion : ["innerCircle"]
    },
    addToInnerCircle : {
        presence : true,
        inclusion: {
            within: ['true','false',true,false], // to support both string and boolean
            message: "has to be true or false"
        }
    },
    limit :  {
        presence : true,
        numericality : {
            onlyInteger: true,
            message : 'should be integer'
        }
    },
    interface :  {
        presence :  true,
        inclusion : ["mobile", "desktop"]
    },
    taskInterval :  {
        presence : true,
        numericality : {
            onlyInteger: true,
            message : 'should be integer'
        }
    },
    userComposedMessage :{
        presence : true
    }
}

// declare an object for each route and list all of its attributes for validation
// use the route name as the key
module.exports = {
    home : {
    },
    getConfig : {
        interface:constraints.interface
    },
    listSchedules: {
        personType: constraints.personType
    },
    listLocations: {
    },
    listStudents: {
        accountId: constraints._id
    },
    listTeamMembers: {
    },
    listTargetBehaviors: {
        studentId: constraints._id
    },
    listAbcs: {
        studentId: constraints._id
    },
    listMessages: {
        accountId:constraints._id
    },
    postFrequencyObservation: { // array
    },
    postAbcObservation:{
        accountId: constraints._id,
        location:constraints.location,
        totalObservationTime:constraints.totalObservationTime
    },
    postTaskObservation:{
        accountId: constraints._id,
        location:constraints.location,
        taskInterval:constraints.taskInterval,
        totalObservationTime:constraints.totalObservationTime
    },
    postNewMessage:{
        accountId: constraints._id,
        toAccountId:constraints._id,
        body:constraints.userComposedMessage
    },
    signIn :{
        email : constraints.emailForAuthentication,
        password : constraints.password,
        authResponse : constraints.authResponse,
        loginMethod : constraints.loginMethod
    },
    signUp : {
        userName : constraints.userName,
        password : constraints.password,
        email : constraints.email,
        age : constraints.age,
        gender : constraints.gender,
        zipCode : constraints.zipCode,
        loginMethod : constraints.loginMethod,
        authResponse : constraints.authResponse
    },
    getMyAccount : {
    },
    validateUserName : {
        userName : constraints.userName
    },
    validateEmail : {
        email : constraints.email
    },
    verifyEmail : {
        email : constraints.email
    },
    verifyResetKey : {
        email : constraints.email,
        resetKey : constraints.resetKey
    },
    updateEmailValidated : {
        accountId : constraints._id,
        resetKey : constraints.resetKey
    },
    updatePassword : {
        _id : constraints._id,
        password : constraints.password,
        confirmPassword : constraints.password
    },
    updateDemographicInfo : {
        age : constraints.age,
        zipCode : constraints.zipCode
    },
    logout : {
    },
    updateLeadPictureInfo : {
        cloudinaryResult: constraints.cloudinaryResult,
        url: constraints.url,
        leadPictureUploaded: constraints.pictureUploaded,
        publicId: constraints.publicId,
        replaceWithPublicId: constraints.replaceWithPublicId,
        deletePublicId : constraints.deletePublicId
    },


    updateGalleryPictureInfo : {
        cloudinaryResult: constraints.cloudinaryResult,
        url: constraints.url,
        galleryPictureUploaded: constraints.pictureUploaded,
        publicId: constraints.publicId
    },
    getInvitationById : {
        invitationId : constraints._id
    },
    getMyInvitations : {
        invitationStatus : constraints.invitationStatus,
        invitationFilter : constraints.invitationFilter
    },
    saveInvitation : {
        email : constraints.email,
        message :constraints.userComposedMessage
    },
    updateInvitation : {
        _id : constraints._id,
        invitationStatus :constraints.invitationStatus
    },
    resendInvitation : {
        invitationId : constraints._id
    },
    cancelInvitation : {
        invitationId : constraints._id
    },
    deleteAccount : {

    },

    getMyMessages :{

    },
    makeMessage : {
        toUserName : constraints.userName,
        toAccountId : constraints._id,
        body :constraints.userComposedMessage
    },
    makeLog : {
    },
    postSupportTicket : {
        name : constraints.firstName,
        email : constraints.email,
        category : constraints.supportCategory,
        userSubject : constraints.subject,
        message : constraints.userComposedMessage
    }
}




