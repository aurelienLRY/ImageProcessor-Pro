
const fs = require("fs");
const generateJsx = require("../generateJsx");
const generateHtml = require("../generateHtml");

async function compressAndResizeImage(buffer, resize, format, quality, path) {
  Jimp.read(buffer)
    .then(image => {
      if (resize) {
        const resizeNumber = Number(resize);
        if (isNaN(resizeNumber)) {
          throw new Error('La valeur de resize doit être un nombre');
        }
        image.resize(resizeNumber, Jimp.AUTO); // redimensionne l'image seulement si resize est défini
      }
      image.quality(parseInt(quality)) // définit la qualité de l'image
        .getBufferAsync(Jimp[`MIME_${format.toUpperCase()}`]) // convertit l'image au format spécifié
        .then(buffer => {
          fs.writeFileSync(path, buffer); // sauvegarde l'image
        });
    })
    .catch(err => {
      throw err;
    });
}

async function generateImages(settings , files, singlePath) {
  const naming = JSON.parse(settings.naming);
  const compressed = JSON.parse(settings.settings).compressed;
  const dimensions = JSON.parse(settings.settings).dimensions;
  const technology = JSON.parse(settings.technology);
  const fileDestination = settings.destination;

  if (fs.existsSync(singlePath)) {
    fs.rmSync(singlePath, { recursive: true });
  }

  files.map(async (file, index) => {
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
      await compressAndResizeImage(
        buffer,
        null,
        "jpeg",
        compressed.jpeg.quality,
        fileSavePath + name + ".jpeg"
      );
    }
    if (compressed.webp.checked) {
     await compressAndResizeImage(
        buffer,
        null,
        "webp",
        compressed.webp.quality,
        fileSavePath + name + ".webp"
      );
    }
    if (compressed.png.checked) {
    await compressAndResizeImage(
        buffer,
        null,
        "png",
        compressed.png.quality,
        fileSavePath + name + ".png"
      );
    }

    dimensions.map(async (dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      if (compressed.jpeg.checked) {
       await compressAndResizeImage(
          buffer,
          resize,
          "jpeg",
          compressed.jpeg.quality,
          fileSavePath + name + dimensionSuffix + ".jpeg"
        );
      }
      if (compressed.webp.checked) {
       await compressAndResizeImage(
          buffer,
          resize,
          "webp",
          compressed.webp.quality,
          fileSavePath + name + dimensionSuffix + ".webp"
        );
      }
      if (compressed.png.checked) {
        await compressAndResizeImage(
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
