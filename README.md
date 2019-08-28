# LogoutEMUsers

A NodeJS application for logging out every EM User from CUCM

## Description

logoutEMUsers communicates with the Extension Mobility service on CUCM via the [Extension Mobility API](<https://developer.cisco.com/docs/extension-mobility-api/>) and tells it to log out every Extension Mobility user on the system. It can be run via CLI or as a scheduled service.

## Requirements

logoutEMUsers is written in NodeJS and requires the NodeJS environment installed on the host to run. It also requires an Application User on the CUCM cluster, with the ‘Standard EM Authentication Proxy Rights’ permission group. A server in the CUCM cluster must run the Extension Mobility service and we also need to be able to connect to the service on port 8443.

## Installation

The application requires the nodejs framework to be installed. This can be downloaded from <https://nodejs.org/en/download/> The LTS version is reccomended. Verify the installation by issuing the command ‘node -v’ from a command prompt. The prompt window needs to be opened after the installation is completed.

Once installed, copy the contents of the logoutEMUSers directory to a directory on the host that will run the application.

Copy the file .env-sample to a new file and rename the copy to .env
In a text editor, update the values in the file so the username and password matches the one created on the CUCM, along with the hostname or IP address of the CUCM server running the Extension Mobility service.

In the command line prompt, navigate to the directory where the application is installed. Install the required nodejs libraries by issuing the command ‘npm install’.

## Use

In a command line prompt, issue the command ‘node logoutemusers.js’. Verify that the http return code is ‘200’ and that the return XML document reads

```xml
<response>  
    <success/>  
</response>
```

All Extension Mobility users should now be logged off, within a few minutes.

If a failure xml document is returned, check the error code and description agains the documentation at the link above and fix any issues.

```xml
<response>  
    <failure>  
        <error code="3">Could not authenticate 'emUser'</error>  
    </failure>  
</response>
```
