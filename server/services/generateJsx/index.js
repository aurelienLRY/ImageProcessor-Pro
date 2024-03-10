/*la function generateJsx permet de générer un component react à partir des données récupérées dans le fichier json. le composant permet l'affiche des images de manière dynamique pour les site responsive 
elle prend en paramètre un objet contenant les données récupérées dans le fichier json et retourne une chaine de caractère contenant le code jsx et sauvegardera le fichier jsx dans le dossier de l'image concerner .
elle sera appelé dans le fichier generateImage.js pour chaque image générer
*/

const fs = require("fs");

function generateJsx(naming, compressed, dimensions, fileDestination, fileSavePath) {
  const jsx = [];
  const jsxPath = `${fileSavePath}/reactComponent/`;
  if (fs.existsSync(jsxPath)) {
    fs.rmdirSync(jsxPath, { recursive: true });
  }
  fs.mkdirSync(jsxPath, { recursive: true });
  jsx.push(`import React from 'react';\n`);
  jsx.push(`import './style.scss';\n`);
  jsx.push(`\n`);
jsx.push(`function ${naming.charAt(0).toUpperCase() + naming.slice(1)}() {\n`);
  jsx.push(`return (\n`);
  jsx.push(`<picture className="image-processor_${naming}">\n`);
  if (compressed.webp.checked) {
    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      jsx.push(
        `<source srcSet='${fileDestination}${naming}${dimensionSuffix}.webp' type="image/webp" media="(max-width: ${resize}px)" />\n`
      );
    });
  }
  if (compressed.jpeg.checked) {
    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      jsx.push(
        `<source srcSet='${fileDestination}${naming}${dimensionSuffix}.jpeg' type="image/jpeg" media="(max-width: ${resize}px)" />\n`
      );
    });
  }
  if(compressed.png.checked){
    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      jsx.push(
        `<source srcSet='${fileDestination}${naming}${dimensionSuffix}.png' type="image/png" media="(max-width: ${resize}px)" />\n`
      );
    });
  }
  jsx.push(
    `<img src='${fileDestination}${naming}.jpeg' alt="${naming}" />\n`
  );
  jsx.push(`</picture>\n`);
  jsx.push(`  );\n`);
  jsx.push(`}\n`);
  jsx.push(`\n`);
  jsx.push(`export default ${naming.charAt(0).toUpperCase() + naming.slice(1)};\n`);
  fs.writeFileSync(`${jsxPath}${naming}.jsx`, jsx.join(""));
  return jsx.join("");
}

module.exports = generateJsx;