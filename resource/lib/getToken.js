var key = 'Bearer ';
module.exports = function (token) {
    return token = token.indexOf(key) > -1 ? token.substring(token.indexOf(' ') + 1) : token;
}