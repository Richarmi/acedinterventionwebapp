'use strict';
var utils = require('../utils/utils');

module.exports = {

    list: function(req, res) {
         var schedules = [
             {period: 'Period 1', location: 'Basic Math 100', id: 1},
             {period: 'Period 2', location: 'English 100', id: 2},
             {period: 'Period 3', location: 'Other Study 300', id: 3},
             {period: 'Period 4', location: 'U.S. History 200', id: 4},
             {period: 'Period 5', location: 'Lunch 500', id: 5},
             {period: 'Period 6', location: 'Gym', id: 6},
             {period: 'Period 7', location: 'Science BIO-100', id: 7},
             {period: 'Period 8', location: 'Cafeteria Free', id: 8},
             {period: 'Period 9', location: 'Current Events 100', id: 9}
         ];
        utils.sendResponseForAPI(null, req, res, {schedules:schedules});
    }
}
