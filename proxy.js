var request = require('request'),
    http = require('http');
    url = require('url');

// build adafruit package
var arcore = require('./packages/arcore.json');
arcore.platforms = arcore.platforms.concat(require('./boards/arcore.json'));

// build adafruit package
var adafruit = require('./packages/adafruit.json');
adafruit.platforms = adafruit.platforms.concat(require('./boards/adafruit.json'));

// build esp8266 package
var esp = require('./packages/esp8266.json');
esp.platforms = esp.platforms.concat(require('./boards/esp8266.json'));

http.createServer(function(req, res) {

  var parsed = url.parse(req.url);

  if(! /arduino\.cc$/.test(parsed.hostname) && ! /uniontownlabs\.org$/.test(parsed.hostname))
    return res.end();

  var proxy_options = {
    url: req.url,
    method: req.method,
    headers: req.headers
  };

  if(! /package_index\.json$/.test(req.url) || req.headers.range != 'bytes=0-')
    return request(proxy_options).pipe(res);

  request(proxy_options, function(err, proxy_response, body) {
    inject(body, res, proxy_response);
  });

}).listen(5050);

function inject(data, res, proxy) {

  try {
    var parsed = JSON.parse(data);
  } catch(e) {
    return res.end('{"packages": []}');
  }

  parsed.packages.push(arcore);
  parsed.packages.push(adafruit);
  parsed.packages.push(esp);

  var body = JSON.stringify(parsed);

  proxy.headers['content-length'] = body.length;
  res.writeHead(proxy.statusCode, proxy.headers);
  res.write(body);
  res.end();

}
