const http = require("http");
let endPoint = "http://34.195.123.173:9998";
let externalApi = "";

const server = http.createServer(function(req, res) {
  console.log(req.url);
  externalApi = endPoint + req.url;
  callExternalApiUsingHttp(function(response) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-origin", "*");
    res.writeHead(200);
    res.write(JSON.stringify(response));
    res.end();
  });
});

server.listen(1234, function() {
  console.log("Listening on 1234");
});

const callExternalApiUsingHttp = callback => {
  console.log(externalApi);
  http
    .get(externalApi, resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        return callback(data);
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
};
