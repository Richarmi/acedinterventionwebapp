'use strict';
var utils = require('../utils/utils');

module.exports = {

    listMessages: function(req, res) {
        var messages = [
            {
                new: true,
                name: 'Josh Bezdek',
                title: 'Hello From Outside',
                src: 'http://placehold.it/300x300',
                brief: 'I just want to let you know that Monday I need help',
                id: 1
            },
            {
                name: 'Becky Clark',
                title: 'Class Change',
                src: 'http://placehold.it/300x300',
                brief: 'Monday there will be a change to the class schedule',
                id: 2
            },
            {
                name: 'Margot Hampton',
                title: 'Student Failing',
                src: 'http://placehold.it/300x300',
                brief: 'I just want to let you know that',
                id: 3
            },
            {
                name: 'Lisa Heep',
                title: 'Random Question',
                src: 'http://placehold.it/300x300',
                brief: 'I just want to let you know that',
                id: 4
            },
            {
                name: 'Maria Simpson',
                title: 'Hello World',
                src: 'http://placehold.it/300x300',
                brief: 'I just want to let you know that',
                id: 5
            },
            {
                name: 'Charles Barclay',
                title: 'Welcome',
                src: 'http://placehold.it/300x300',
                brief: 'I just want to let you know that',
                id: 6
            }
        ];
        utils.sendResponseForAPI(null, req, res, {messages:messages});
    },
    postNewMessage : function(req,res) {
        console.log(req.body.postNewMessage);
        utils.sendResponseForAPI(null, req, res, {postNewMessage:'success'});
    }
};

