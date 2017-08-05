var constant = require('../common/constant');
var mongoose = require('mongoose');

module.exports = {
    /**
     *
     * @param {string} text
     * @param {string} replaceStr
     * @return {void|XML|string|*}
     */
    replaceByPlaceholder: function (text, replaceStr) {
        return replaceStr.replace(constant.replaceText, text);
    },

    /**
     *
     * @param {string} string
     * @param splitFlag
     */
    getObjectBySplit: function (string, splitFlag) {

        return  JSON.parse(string.substring(string.indexOf(splitFlag)).trim());
    },
    getDBConnection: function () {
        return mongoose.createConnection('119.28.128.210', 'testDB');
    }
};