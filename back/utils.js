const readlineSync = require('readline-sync');
const config = require('../config/config.js');

isValidJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    isValidJsonString,
};
