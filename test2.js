const fetch = require("node-fetch");
var qs = require("querystring");

var username = 'emdevel';
var password = 'emdevel';
var hostname = '10.26.56.52';
var portnumber = '8443';
const url = `https://${hostname}:${portnumber}//emservice/EMServiceServlet`;




const getPhoneNameByUsername = async url ,searchTarget => {
  try {
    var myQuery = qs.stringify({ xml: `<query>\n    <appInfo>\n        <appID>${username}</appID>\n        <appCertificate>${password}</appCertificate>\n    </appInfo>\n       <userDevicesQuery>  \n        <userID>${searchTarget}</userID>  \n    </userDevicesQuery>  \n</query>` });
    var headers = {
        
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*",
            "Cache-Control": "no-cache",
            "Host": hostname +':'+portnumber,
            "Accept-Encoding": "gzip, deflate",
            "Content-Length": myQuery.length,
            "Connection": "keep-alive",
            "cache-control": "no-cache"
          
      }
    const response = await fetch(url,{ method: 'POST', headers: headers, body: myQuery});
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

getData(url);