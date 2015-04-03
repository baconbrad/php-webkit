# PHP-WEBKIT

[![Join the chat at https://gitter.im/baconface/php-webkit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/baconface/php-webkit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Introduction

The goal of php-webkit is to be able to package a PHP app within a [NW.js](http://nwjs.io/) project without needing the user to install and set up PHP on their system or connect to a remote PHP codebase. This repository is what your NW.js project should be set up as to succeed this objective. When your NW.js application is executed node.js starts up an internal PHP web server using the binaries in the php directory. This web server will start up any PHP project you have in the application directory. You can modify php-webkit's files as well as the ```package.json``` to fit your application's needs. Just be cautious not to change anything that will break php-webkit's ability to run properly. The end result is a PHP desktop application that is also capable of executing node.js code.

## Packaging and Distributing

You can create a PHP desktop app by going to [NW.js](http://nwjs.io/), downloading your target machines files, and following the [packaging instructions provided by NW.js](https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps) using the files you found here as your NW.js project directory. [Express](https://www.npmjs.com/package/express) is a required dependency for this project.

## Multiple Platforms

Although it may need a little additonal work you can make a PHP desktop application for Windows, Linux, and OSX. Currently the binaries for PHP are version 5.6 32-bit thread safe binaries for Windows. But you can switch it out with a different version/platform found at [PHP.net](http://php.net/) or elsewhere. Linux and OSX versions have a slightly different file structure and so far a packaging scheme has not been decided so you will need to come up with your own. Have suggestions? Do feel free to share.

(I have not tested it on any ARM based builds of NW.js but I don't see why it couldn't work.)

## Optional PHP Packaging

You may wish to use PHP within a NW.js project but don't want to package it within your application binary. You can either move it outside the directory or use the machines installed version of PHP if applicable. If you want to move it to another folder specify the new location as ```bin``` in your ```package.json```. It can even be outside of your project directory. If PHP is installed properly you can simply put ```php-cgi``` in this field instead. If no binaries are found in the PHP directory php-webkit will attempt to call ```php-cgi``` as a last resort to run your application.

## Server Variables

You can access basic details about your php-webkit/NW.js project via PHP's server variables. These are injected when the server is spun up so they do not require a special build of PHP to obtain.
 
 * ```$_SERVER["PW_BIN_PATH"]``` - Path of NW.js binary
 * ```$_SERVER["PW_BIN_FILE"]``` - File nane of NW.js binary
 * ```$_SERVER["PW_APP_PATH"]``` - Path of PHP application
 * ```$_SERVER["PW_ARGUMENTS"]``` - Arguments sent to NW.js binary
 * ```$_SERVER["PW_MANIFEST"]``` - JSON object of package.json
 * ```$_SERVER["PW_SERVER_HOST"]``` - Host the server is running under
 * ```$_SERVER["PW_SERVER_PORT"]``` - Port the server is running under

## Security Notice

Some things should be noted. This was created as a boilerplater within a weekend. The idea was to get it to work. Although set up to not be accessable remotely the internal server and PHP config were not given any additional security modifications. It is ultimately up to you to ensure your web app's security is intact.

Your PHP code is also kept client side opposed to server side. As a result you do risk the chance of having your binary reversed enginered and your source code exposed. So you should avoid storing DB password connection information or other sensitive information within your source if it is a public application. And instead opt to do RESTful API calls to a remote server that handles sensitive duties.

Node.js code is configured to only be ran on the localhost. Node.js will allow additional methods of access to the users local machine. If you need to prevent this remove the ```node-remote``` setting from package.json.

## License

Unless specified elsewhere php-webkit's boilerplate project is released under the MIT License.

The MIT License (MIT)
Copyright (c) 2015 Brad Metcalf (brad@localabstract.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
