# Arduino Board Manager Custom Board Proxy

**Warning:** Third party boards are now officially supported in Arduino v1.6.4+, so this is no longer needed.
Check out [this tutorial for more info](https://learn.adafruit.com/add-boards-arduino-v164).

This is a simple node.js HTTP proxy that allows you to inject custom boards into the Arduino 1.6.2+
`package_list.json` file. When the list is requested, it grabs the latest package list from Arduino's
servers and injects the custom packages into the file before serving it back to the IDE.

You will only need to download and run the proxy if you have custom boards of your own to add to the Board Manager list. If you are looking to add Adafruit's custom boards to your Board Manager list, there is no need to download anything. Check out [this tutorial](https://learn.adafruit.com/adding-custom-boards-to-the-arduino-v1-6-board-manager) for more info about pointing your Arduino IDE at our proxy.

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

You can take a look at the `boards` & `packages` directories for examples. They probably can be simplified,
but they are a good starting place.

![Screenshot](/proxy.png?raw=true "Proxy")

## License

Copyright (c) 2015 Adafruit. Licensed under the MIT license.
