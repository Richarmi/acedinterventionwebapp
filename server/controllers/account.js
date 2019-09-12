'use strict';
var utils = require('../utils/utils');

module.exports = {

    list: function(req, res) {
        var teamMembers = [
            { title: 'JB', src:'http://placehold.it/300x300', id: 1 },
            { title: 'VS', src:'http://placehold.it/300x300', id: 2 },
            { title: 'HS', src:'http://placehold.it/300x300', id: 3 },
            { title: 'EW', src:'http://placehold.it/300x300', id: 4 },
            { title: 'AL', src:'http://placehold.it/300x300', id: 5 },
            { title: 'BF', src:'http://placehold.it/300x300', id: 6 }
        ];
        utils.sendResponseForAPI(null, req, res, {teamMembers:teamMembers});
    }
}
