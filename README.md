# Arduino Board Manager Test Proxy Server

This is a simple node.js HTTP proxy that allows you to inject custom boards into the Arduino 1.6.2+
`package_list.json` file. When the list is requested, it grabs the latest package list from Arduino's
servers and injects the custom packages into the file before serving it back to the IDE.

## Installing

Make sure you have the latest stable node.js:

```
$ node -v
v0.12.2
```

Clone the repo and install dependencies:

```
$ git clone https://github.com/adafruit/adafruit-arduino-proxy.git
$ cd adafruit-arduino-proxy
$ npm install
```

Start the server:

```
$ node proxy.js
```

## Example Packages & Boards

You can take a look at the boards & packages directory for examples. They probably can be simplified,
but they seem to be a good starting spot.

![Screenshot](/proxy.png?raw=true "Proxy")

## License

Copyright (c) 2015 Adafruit. Licensed under the MIT license.
