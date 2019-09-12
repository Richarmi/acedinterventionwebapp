'use strict';
var utils = require('../utils/utils');

module.exports = {

    list: function(req, res) {
        var students = [
            { title: 'JB', src:'http://placehold.it/300x300', id: 1 },
            { title: 'VS', src:'http://placehold.it/300x300', id: 2 },
            { title: 'HS', src:'http://placehold.it/300x300', id: 3 },
            { title: 'EW', src:'http://placehold.it/300x300', id: 4 },
            { title: 'AL', src:'http://placehold.it/300x300', id: 5 },
            { title: 'BF', src:'http://placehold.it/300x300', id: 6 }
        ];
        utils.sendResponseForAPI(null, req, res, {students:students});
    },

    listTargetBehaviors : function(req,res) {
        var behaviors = [
            {title: 'Tantrum', id: 1},
            {title: 'Eats Nonedible Items', id: 2},
            {title: 'Vindictive or Malicious', id: 3}
        ];
        utils.sendResponseForAPI(null, req, res, {behaviors:behaviors});
    },

    listAbcs : function(req,res) {
        var abcItems =   {
            abcBehaviors: [
                {title: 'Non-Compliance', checked: false},
                {title: 'Bullying / Harassment', checked: false},
                {title: 'Physical Aggression', checked: false}
            ],
            abcAntecedents: [
                {title: 'Negative Adult Attention', checked: false},
                {title: 'Given Negative Consequences', checked: false},
                {title: 'Prompt for Academic Task', checked: false},
                {title: 'Peer Interaction', checked: false},
                {title: 'Access to Item/Activity Denied/Taken Away', checked: false}
            ],
            abcConsequences: [
                {title: 'Calm Redirect', checked: false},
                {title: 'Negative Reprimand', checked: false},
                {title: 'Ignored', checked: false},
                {title: 'Sent Out / Left Alone', checked: false},
                {title: 'Escaped adult directive / control', checked: false}
            ],
            userTyped:{
                abcAntecedent:{title:'',checked: false},
                abcConsequence:{title:'',checked: false}
            }
        }
        utils.sendResponseForAPI(null, req, res, {abcItems:abcItems});
    },

    postFrequencyObservation : function(req,res) {
        console.log(req.body.postFrequencyObservation);
        utils.sendResponseForAPI(null, req, res, {postFrequencyObservation:'success'});
    },
    postAbcObservation : function(req,res) {
        console.log(req.body.postAbcObservation);
        utils.sendResponseForAPI(null, req, res, {postAbcObservation:'success'});
    },
    postTaskObservation : function(req,res) {
        console.log(req.body.postTaskObservation);
        utils.sendResponseForAPI(null, req, res, {postTaskObservation:'success'});
    }
}
