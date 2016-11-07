/**
 * Created by Peter on 11.11.2016.
 */
const crypto = require('crypto');

const serverSalt = "sd#n@45Df";

exports.sha512 = function(password){
    const hash = crypto.createHmac('sha512', serverSalt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: serverSalt,
        passwordHash: value
    };
};