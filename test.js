var qs = require("querystring");
var http = require("https");
var xmlparser = require("xml-js");

var myData = qs.stringify({ xml: '<query>\n    <appInfo>\n        <appID>emdevel</appID>\n        <appCertificate>emdevel</appCertificate>\n    </appInfo>\n       <userDevicesQuery>  \n        <userID>BALKBIM</userID>  \n    </userDevicesQuery>  \n</query>' })
var options = {
  "method": "POST",
  "hostname": "10.26.56.52",
  "port": "8443",
  "rejectUnauthorized": false,
  "path": "/emservice/EMServiceServlet",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Host": "10.26.56.52:8443",
    "Accept-Encoding": "gzip, deflate",
    "Content-Length": myData.length,
    "Connection": "keep-alive",
    "cache-control": "no-cache"
  }
};
//console.log(options);
var req = http.request(options, function (res) {
  var chunks = [];
  //console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);

  res.on("data", function (chunk) {
  //  console.log(chunk.toString());
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var jsonbody = JSON.parse(xmlparser.xml2json(body,{compact: true, spaces: 4}));
   // console.log(body.toString());
  // console.log(JSON.stringify(jsonbody));
    console.log(""+jsonbody.response.userDevicesResults.user._attributes.id);
    console.log(""+jsonbody.response.userDevicesResults.user.deviceName._text);

  });
});

req.write(myData);
req.end();