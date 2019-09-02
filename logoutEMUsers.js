var qs = require("querystring");
var http = require("https");

require('dotenv').config()

var username = process.env.EMUSERNAME;
var password = process.env.EMPASSWORD;
var hostname = process.env.HOSTNAME;
var portnumber = process.env.PORTNUMBER;

var myData = qs.stringify({ xml: `<request>\    
                                        <appInfo>\
                                                <appID>${username}</appID>\
                                                <appCertificate>${password}</appCertificate>\
                                        </appInfo>\
                                        <logoutAll>\
                                        </logoutAll>\
                                    </request>` });

var options = {
    "method": "POST",
    "hostname": hostname,
    "port": portnumber,
    "rejectUnauthorized": false,
    "path": "/emservice/EMServiceServlet",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Host": hostname + ':' + portnumber,
        "Accept-Encoding": "gzip, deflate",
        "Content-Length": myData.length,
        "Connection": "keep-alive",
        "cache-control": "no-cache"
    }
};

var req = http.request(options, function (res) {
    var chunks = [];

    

    res.on("data", function (chunk) {

        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(`Response from the EM service was: ${res.statusCode}`);
        console.log(`Body of response xml document:` + body.toString());

    });
});

req.write(myData);
console.log('Request sent! ');
req.end();