var i = 0;
function add() {
    return ++i;
}
module.exports = function() {
    return add()
}
