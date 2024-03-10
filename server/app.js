const express = require("express"); // import express
const multer = require("multer"); // import multer for file upload
const archiver = require("archiver"); // import archiver for file compression
const uuid = require("uuid"); // import uuid for unique file names
const path = require("path"); // import path for file paths
const fs = require("fs"); // import fs for file system

/*************
 *local import*
 **************/
const CheckInputs = require("./utiles/chekInput"); // import the function that check the inputs
const generateImages = require("./services/generateImage"); // import the function that generate the images

const app = express();
const upload = multer();

app.use(express.json()); // parse the body of the request

// set the headers of the response
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.get("/",(req, res) => {
  try {
    res.status(200).send("Welcome to the image processor");
    res.end();
  } catch (error) { 
    res.status(500).json({ error: error.toString() });
    res.end();
  }
});


// the route that will be called when the form is submitted
app.post("/", upload.any(), async (req, res) => {
  const settings = req.body;
  const files = req.files; 

  // check if the inputs are valid or not ? Return error if not or false if valid
  const error = CheckInputs(settings, files);
  if (error) {
    res.status(400).json({ error: error });
    res.end();
    return;
  }

  const uniqueId = uuid.v4();// generate a unique id for the request
  const singlePath = `/image_Processor/${uniqueId}`;// generate a unique path for the request
  
  
generateImages(settings, files, singlePath);// generate the images and the jsx and html files

fs.mkdirSync(`.${singlePath}/zip/`, { recursive: true }) // create the zip folder

// create the zip file
 const output = fs.createWriteStream(
    path.join(__dirname, `${singlePath}/zip/imageProcessor.zip`)
  );
  
  const archive = archiver("zip", { zlib: { level: 9 } });// create the zip file with the highest compression level

  archive.on("error", (err) => {
    console.log(err);
    res.status(500).json({ error: err.toString() });
    res.end();
  });

  archive.pipe(output);// pipe the output to the archive
  archive.directory(`.${singlePath}/imageProcessor`, false);// add the imageProcessor folder to the archive


  await archive.finalize();// finalize the archive

  // send the zip file to the client
  output.on("close", () => {
    res.download(
      path.join(__dirname, `${singlePath}/zip/imageProcessor.zip`),
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.toString() });
          res.end();
        } else {
          res.end();
          setTimeout(() => {
            if (fs.existsSync(`.${singlePath}`)) {
              fs.rmSync(`.${singlePath}`, { recursive: true, force: true });
            }
          }, 10000);
          return;
        }
      }
    );
  });
});

module.exports = app;
