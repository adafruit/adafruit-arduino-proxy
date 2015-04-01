var request = require('request'),
    http = require('http');
    url = require('url');

http.createServer(function(req, res) {

  var parsed = url.parse(req.url);

  if(! /arduino\.cc$/.test(parsed.hostname) && ! /uniontownlabs\.org$/.test(parsed.hostname))
    return res.end();

  var proxy_options = {
    url: req.url,
    method: req.method,
    headers: req.headers
  };

  request(proxy_options, function(err, proxy_response, body) {

    if(! /package_index\.json$/.test(req.url) || req.headers.range != 'bytes=0-') {
      res.writeHead(proxy_response.statusCode, proxy_response.headers);
      res.write(body);
      return res.end();
    }

    inject(body, res, proxy_response);

  });

}).listen(5050);

function inject(data, res, proxy) {

  try {
    var parsed = JSON.parse(data);
  } catch(e) {
    return res.end('{"packages": []}');
  }

  for(var i=0; i < parsed.packages.length; i++) {

    if(parsed.packages[i].name !== 'arduino')
      continue;


    parsed.packages[i].platforms.push(require('./boards/arcore.json'));
    console.log(parsed.packages[i].platforms);

  }

  var body = JSON.stringify(parsed);

  proxy.headers['content-length'] = body.length;

  res.writeHead(proxy.statusCode, proxy.headers);
  res.write(body);
  res.end();

}
