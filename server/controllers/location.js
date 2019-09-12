'use strict';
var utils = require('../utils/utils');

module.exports = {

    list: function(req, res) {
        var locations = [
            {title: 'Title of class subject 1', id: 1},
            {title: 'Title of class subject 2', id: 2},
            {title: 'Title of class subject 3', id: 3},
            {title: 'Title of class subject 4', id: 4},
            {title: 'Title of class subject 5', id: 5},
            {title: 'Title of class subject 6', id: 6},
            {title: 'Title of class subject 7', id: 7},
            {title: 'Title of class subject 8', id: 8}
        ];
        utils.sendResponseForAPI(null, req, res, {locations:locations});
    }
}
