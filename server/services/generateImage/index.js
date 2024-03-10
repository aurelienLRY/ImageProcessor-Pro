const sharp = require("sharp");
const fs = require("fs");
const generateJsx = require("../generateJsx");
const generateHtml = require("../generateHtml");

function compressAndResizeImage(buffer, resize, format, quality, path) {
  sharp(buffer)
    .resize(resize)
    .toFormat(format)
    [format]({ quality: parseInt(quality) })
    .toFile(path, (err, info) => {
      if (err) throw err;
      console.log(info);
    });
}

function generateImages(settings , files, singlePath) {
  const naming = JSON.parse(settings.naming);
  const compressed = JSON.parse(settings.settings).compressed;
  const dimensions = JSON.parse(settings.settings).dimensions;
  const technology = JSON.parse(settings.technology);
  const fileDestination = settings.destination;

  if (fs.existsSync(singlePath)) {
    fs.rmSync(singlePath, { recursive: true });
  }

  files.map((file, index) => {
    const name = naming[index];
    const fileSavePath = `.${singlePath}/imageProcessor/${name}/`;
    fs.mkdirSync(fileSavePath, { recursive: true });

    if (technology.react) {
      generateJsx(name, compressed, dimensions, fileDestination ,fileSavePath);
    }

    if (technology.html) {
      generateHtml(name, compressed, dimensions, fileDestination, fileSavePath);
    }

    const buffer = file.buffer;

    // Enregistre l'image à sa taille originale pour chaque format
    if (compressed.jpeg.checked) {
      compressAndResizeImage(
        buffer,
        null,
        "jpeg",
        compressed.jpeg.quality,
        fileSavePath + name + ".jpeg"
      );
    }
    if (compressed.webp.checked) {
      compressAndResizeImage(
        buffer,
        null,
        "webp",
        compressed.webp.quality,
        fileSavePath + name + ".webp"
      );
    }
    if (compressed.png.checked) {
      compressAndResizeImage(
        buffer,
        null,
        "png",
        compressed.png.quality,
        fileSavePath + name + ".png"
      );
    }

    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      if (compressed.jpeg.checked) {
        compressAndResizeImage(
          buffer,
          resize,
          "jpeg",
          compressed.jpeg.quality,
          fileSavePath + name + dimensionSuffix + ".jpeg"
        );
      }
      if (compressed.webp.checked) {
        compressAndResizeImage(
          buffer,
          resize,
          "webp",
          compressed.webp.quality,
          fileSavePath + name + dimensionSuffix + ".webp"
        );
      }
      if (compressed.png.checked) {
        compressAndResizeImage(
          buffer,
          resize,
          "png",
          compressed.png.quality,
          fileSavePath + name + dimensionSuffix + ".png"
        );
      }
    });
  });
}

module.exports = generateImages;
