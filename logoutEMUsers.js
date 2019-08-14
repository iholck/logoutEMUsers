var qs = require("querystring");
var http = require("https");

require('dotenv').config()

var username = process.env.USERNAME;
var password = process.env.PASSWORD;
var hostname = process.env.HOSTNAME;
var portnumber = process.env.PORTNUMBER;

var myData = qs.stringify({ xml: `<query>\n    <appInfo>\n        <appID>${username}</appID>\n        <appCertificate>${password}</appCertificate>\n    </appInfo>\n       <logoutAll>  \n  </logoutAll>  \n</query>` })
var options = {
    "method": "POST",
    "hostname": hostname,
    "port": portnumber,
    "rejectUnauthorized": process.env.ENFORCECERT,
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

    console.log(`Request sent! Response from the EM service was: ${res.statusCode}`);

    res.on("data", function (chunk) {

        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(`Body of response xml document:` + body.toString());

    });
});

req.write(myData);
req.end();