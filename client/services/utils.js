// utilities

var utilsService = function($uibModal,$rootScope,$log,$cookieStore,Upload) {
    var utilServiceMethods = {

        // generic service handler
        successCallBack : function(cb) {
            return function(results) {
                cb(null, null,results)
            }
        },

        errorCallBack : function(cb) {
            return function(err) {
                cb(err, null,null)
            }
        },

        getCookie : function(cookieName) {
            return ($cookieStore.get(cookieName));
        },
        setCookie : function(cookieName,value) {
            $cookieStore.put(cookieName,value);
            return true;
        },
        removeCookie : function(cookieName) {
            $cookieStore.remove(cookieName);
            return true;
        },
        getRandom: function (length) {
            return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
        },

        // return a modal instance (refer to angular-bootstrap documentation for more info)
        openModal: function (opts) {
            return $uibModal.open(opts)
        },

        closeModal: function (modelInstance) {
            modelInstance.close()
        },

        dismissModal: function (modelInstance) {
            modelInstance.dismiss('cancel')
        },

        validateInput: function (routeName, params) {
            var msg = []
            var constraints = $rootScope.constraints[routeName][routeName];
            if (constraints) {
                if (params) {
                    var validateMsg = validate(params, constraints)
                    if (validateMsg) msg.push(validateMsg);
                }
            } else {
                msg.push('constraints object not found in route configs');
            }
            return msg;
        },

        uploadFileToCloudinary : function(configs,file) {
            var cloudName =  $rootScope.cloudinaryConfigs.cloudName;
            return Upload.upload({
                url: "https://api.cloudinary.com/v1_1/" + cloudName + "/upload",
                fields: {upload_preset: $rootScope.cloudinaryConfigs.uploadPreset,
                    tags: configs.tags,
                    custom_coordinates:configs.customCoordinates,
                    public_id : configs.publicId
                },
                file: file
            });
        },

        highlightWordsInWordCloud : function (wc1,wc2) {
            var likeMatchArray=[], dislikeMatchArray = [];
            // likes match
            _.each(wc1.likes,function(like1){
                _.each(wc2.likes,function(like2){
                    if (like1.trim().toLowerCase() == like2.trim().toLowerCase()) {
                        likeMatchArray.push(like1.toLowerCase());
                    }
                });
            });

            //dislikes match
            _.each(wc1.dislikes,function(dislike1){
                dislike1.wordMatch = false;
                _.each(wc2.dislikes,function(dislike2){
                    if (dislike1.trim().toLowerCase() == dislike2.trim().toLowerCase()) {
                        dislikeMatchArray.push(dislike1.toLowerCase());
                    }
                });
            });

            // match the words in the word cloud
            // likes match
            // array item format - {word:'',wordMatch:true}
            wc1.likesForDisplay = [];
            wc2.likesForDisplay = [];
            wc1.dislikesForDisplay = [];
            wc2.dislikesForDisplay = [];
            var isMatch=false;
            _.each(wc1.likes,function(like1){
                (_.indexOf(likeMatchArray,like1.trim().toLowerCase()) > -1 ?  isMatch = true: isMatch = false);
                wc1.likesForDisplay.push({word:like1,wordMatch: isMatch});
            });
            _.each(wc1.dislikes,function(dislike1){
                (_.indexOf(dislikeMatchArray,dislike1.trim().toLowerCase()) > -1 ?  isMatch = true: isMatch = false);
                wc1.dislikesForDisplay.push({word:dislike1,wordMatch:isMatch});
            });

            _.each(wc2.likes,function(like2){
                (_.indexOf(likeMatchArray,like2.trim().toLowerCase()) > -1 ?  isMatch = true: isMatch = false);
                wc2.likesForDisplay.push({word:like2,wordMatch:isMatch});
            });
            _.each(wc2.dislikes,function(dislike2){
                (_.indexOf(dislikeMatchArray,dislike2.trim().toLowerCase()) > -1 ?  isMatch = true: isMatch = false);
                wc2.dislikesForDisplay.push({word:dislike2,wordMatch:isMatch});
            });

            return true;
        },


        logger : function(level,message) {
            switch (level) {
                case "log" :
                    if ($rootScope.clientDebug) {
                        $log.log(message);
                    }
                    break;
                case "info" :
                    if ($rootScope.clientDebug) {
                        $log.info(message);
                    }
                    break;
                case "error" :
                    $log.error(message);
                    break;
                case "warn" :
                    if ($rootScope.clientDebug) {
                        $log.warn(message);
                    }
                    break;
            }
        },

        isMobile : function() {
            if ($('.navbar-brand .navbar-brand__title').css('display') == 'none') {
                return true;
            } else if ($('.navbar-brand .navbar-brand__title').css('display') != 'inline-block') {
                return false;
            } else {
                return false
            }

        },

        dataURItoBlob : function (dataURI) {
            var arr = dataURI.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]);
            n = bstr.length,
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
    }
    return utilServiceMethods
}

angular.module('acedIntervention.services').factory('utilsService',['$uibModal','$rootScope','$log','$cookieStore','Upload',utilsService]);