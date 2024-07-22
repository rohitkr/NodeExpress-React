const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const crypto = require('crypto');

// Generate a random nonce value
// const nonce = crypto.randomBytes(16).toString('base64');
const nonceScript = "C7Jo9Ot7OGp36jCfSpoTKw==";
const nonceStyle = "A7Jo9Ot7OGp36jCfSpoTKw==";
console.log('nonceScript: ', nonceScript);
console.log('nonceStyle: ', nonceStyle);

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      homepage: "/api/homepage",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.setHeader('Content-Security-Policy', `default-src 'self'; style-src 'self' 'nonce-${nonceStyle}'; script-src 'self' 'nonce-${nonceScript}';`);
      res.locals.nonce = nonceScript;
      next();
    });
    
    // Pick up React index.html file
    this.app.use(
      express.static(path.join(__dirname, "../client/build"))
    );
  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.homepage, require("../routes/homepage"));
    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "../client/build/index.html")
      );
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
