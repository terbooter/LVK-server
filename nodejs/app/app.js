"use strict";
var http = require('http');
var querystring = require('querystring');
var allowedDomains = [];
if (process.env["ALLOWED_DOMAINS"]) {
    allowedDomains = process.env["ALLOWED_DOMAINS"].split(",");
}
console.log(allowedDomains);
http.createServer(function (request, response) {
    var body = [];
    request.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        var str = Buffer.concat(body).toString();
        var p = querystring.parse(str.toString());
        if (canPlay(p)) {
            response.statusCode = 200;
        }
        else {
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
    var swfurl = "";
    if (p.swfurl) {
        swfurl = p.swfurl;
    }
    if (allowForLVK(swfurl) && allowForDomain(swfurl)) {
        return true;
    }
    console.log("CAN NOT PLAY !!!");
    return false;
}
function allowForLVK(swfUrl) {
    var hasPlayerSubstring = swfUrl.indexOf("player.swf") != -1;
    var hasPublisherSubstring = swfUrl.indexOf("publisher.swf") != -1;
    if (hasPlayerSubstring || hasPublisherSubstring) {
        return true;
    }
    return false;
}
function allowForDomain(swfUrl) {
    for (var _i = 0, allowedDomains_1 = allowedDomains; _i < allowedDomains_1.length; _i++) {
        var domain = allowedDomains_1[_i];
        if (domain == "any") {
            return true;
        }
        if (swfUrl.indexOf(domain) != -1) {
            return true;
        }
    }
    console.log("Error. not allowed for domain. swfurl=" + swfUrl);
    return false;
}
