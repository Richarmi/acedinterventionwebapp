module.exports = {
    // note the html templates are rendered from dist folder
    // views rendering is configured in server.js
    templatePath : '../views/email',
    termsLink : '/#/lglm/terms',
    privacyLink : '/#/lglm/privacy',
    unsubscribeLink : '',
    userProfileLinkForDating : '/#/dtpm/date/', // userName should be added to this link
    dateMatchesInCommunityLink : '/#/datm/matchesInCommunity/1',
    dateMyMatchesLink : '/#/datm/myMatches/1',
    dateFavoritesLink : '/#/datm/favorites/1',
    matchMakeMatchForCommunityLink : '/#/mmkm/matchesInCommunity/1',
    matchMakeInnerCircleOfLink : '/#/mmkm/innerCircleOf/1',
    connectMessageLink : '/#/cntm/messages/', // userName should be added to this link
    connectMyInnerCircleLink : '/#/cntm/myInnerCircle',
    emailList : [
        {
            name : 'confirmEmail'
            , title: 'Confirm Email Address'
            , description : 'Email to confirm user`s email address'
            , subject: 'Please confirm your email address.'
            , template: '/confirmEmail.html'
            , controller : 'confirmEmailController'
        },
        {
            name : 'registrationConfirmation'
            , title: 'Registration Confirmation'
            , description : 'Email to confirm completion of registration'
            , subject: 'Thanks for joining Wovo!'
            , template: '/registrationConfirmation.html'
            , controller : 'registrationConfirmationController'
        },
        {
            name : 'resetPassword'
            , title: 'Reset Password'
            , description : 'Email to send a key to user to reset password'
            , subject: 'Password Reset.'
            , template: '/resetPassword.html'
            , controller : 'resetPasswordController'
        },
        {
            name : 'inviteToInnerCircle'
            , title: 'Invitation'
            , description : 'Invitation to join Wovo to match make for a friend'
            , subject: '{{userName}} wants your help finding matches on Wovo'
            , template: '/inviteToInnerCircle.html'
            , controller : 'inviteToInnerCircleController'
        },
        {
            name : 'inviteFriends'
            , title: 'Invitation'
            , description : 'Invitation to join Wovo'
            , subject: 'Someone loves you.'
            , template: '/inviteFriends.html'
            , controller : 'inviteFriendsController'
        },
        {
            name : 'profileComplete'
            , title: 'Profile Complete'
            , description : 'Email to inform that profile is complete'
            , subject: 'Your profile is active. Start dating today!'
            , template: '/profileComplete.html'
            , controller : 'profileCompleteController'
        },
        {
            name : 'addedToFavorites'
            , title: 'You\'ve been hearted'
            , description : 'Email to person who has been added to favorite'
            , subject: 'You have an admirer. Someone added you to their favorites'
            , template: '/addedToFavorites.html'
            , controller : 'addedToFavoritesController'
        },
        {
            name : 'newMessage'
            , title: 'New Message'
            , description : 'Email information about a new message'
            , subject: 'You have a new message on Wovo'
            , template: '/newMessage.html'
            , controller : 'newMessageController'
        },
        {
            name : 'newSupportTicket'
            , title: 'New Support Ticket'
            , description : 'Email to our support team about a new support ticket'
            , subject: 'New Support Ticket'
            , template: '/newSupportTicket.html'
            , controller : 'newSupportTicketController'
        },
        {
            name : 'newSignUpNotification'
            , title: 'New Sign up Notification'
            , description : 'Email to notify of a new sign up'
            , subject: 'New Sign Up'
            , template: '/newSignUpNotification.html'
            , controller : 'newSignUpNotificationController'
        }
    ]
}