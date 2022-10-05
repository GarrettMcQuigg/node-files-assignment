const fs = require("fs");
const process = require("process");
const axios = require("axios");

const cat = function (path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
};

const webCat = async function (url, out) {
  try {
    let res = await axios.get(url);
    handleOutput(res.data, out);
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
