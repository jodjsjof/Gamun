const http = require('http');
const https = require('https');
const fs = require('fs');

// CONFIGURATION
const prefix = '/web';  // Set your prefix here
const localAddresses = [];  // Set your local addresses here
const blockedHostnames = ["https://sevenworks.eu.org/bad-site"];  // Set your blocked hostnames here
const ssl = false;  // Set SSL configuration here
const port = 6969;  // Set the desired port
const index_file = 'index.html'; // Set index file shown by the browser
// END OF CONFIGURATION

const proxy = new (require('./lib/index'))(prefix, {
  localAddress: localAddresses,
  blacklist: blockedHostnames
});

const atob = str => Buffer.from(str, 'base64').toString('utf-8');

const app = (req, res) => {
  if (req.url.startsWith(prefix)) {
    proxy.http(req, res);
    return;
  }

  req.pathname = req.url.split('#')[0].split('?')[0];
  req.query = {};
  req.url
