var body = require('./body')
var title = require('./title')

exports.creat = function() {
    return {
        name: 'this is HtmlElement',
        title: title(),
        body: body()
    }
}