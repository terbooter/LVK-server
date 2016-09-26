var http = require('http');
const querystring = require('querystring');

http.createServer(function (request, response) {

    var body = [];
    request.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        var p = querystring.parse(body.toString());
        if (canPlay(p)) {
            response.statusCode = 200;
        } else {
            response.statusCode = 500;
        }
        response.end();
    });
}).listen(80);

function canPlay(p) {

    /*
     https://github.com/arut/nginx-rtmp-module/wiki/Directives#on_play
     call=connect
     addr - client IP address
     app - application name
     flashVer - client flash version
     swfUrl - client swf url
     tcUrl - tcUrl
     pageUrl - client page url*/

    console.log(p);

    if (p.swfurl) {
        var hasPlayerSubstring = p.swfurl.indexOf("player.swf") != -1;
        var hasPublisherSubstring = p.swfurl.indexOf("publisher.swf") != -1;
        if (hasPlayerSubstring || hasPublisherSubstring) {
            return true;
        }
    }
    console.log("CAN NOT PLAY !!!");
    return false;
}