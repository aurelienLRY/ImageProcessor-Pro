/*la function generateHTML permet de générer le code <picture>  à partir des données récupérées dans le fichier json. se code permet l'affiche des images de manière dynamique pour les site responsive 
elle prend en paramètre un objet contenant les données récupérées dans le fichier json et retourne une chaine de caractère contenant le code html et sauvegardera le fichier txt dans le dossier de l'image concerner .
elle sera appelé dans le fichier generateImage.js pour chaque image générer
cette fonction s'inpire de la founction geratehtml du fichier generateImage.js
*/
const fs = require('fs');
function generateHtml (naming, compressed, dimensions, fileDestination, fileSavePath){
const html = []; 
const htmlPatch = `${fileSavePath}/htmlCode/`;
if (fs.existsSync(htmlPatch)){
  fs.rmdirSync(htmlPatch, {recursive: true});
}
fs.mkdirSync(htmlPatch, {recursive: true});

html.push(`<picture class="image-processor_${naming}">\n`);
if (compressed.webp.checked) {
    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      html.push(
        `<source srcSet='${fileDestination}${naming}${dimensionSuffix}.webp' type="image/webp" media="(max-width: ${resize}px)" />\n`
      );
    });
  }
  if (compressed.jpeg.checked) {
    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      html.push(
        `<source srcSet='${fileDestination}${naming}${dimensionSuffix}.jpeg' type="image/jpeg" media="(max-width: ${resize}px)" />\n`
      );
    });
  }
  if(compressed.png.checked){
    dimensions.map((dimension) => {
      const dimensionSuffix = dimension.dimensionSuffix;
      const resize = parseInt(dimension.dimension);
      html.push(
        `<source srcSet='${fileDestination}${naming}${dimensionSuffix}.png' type="image/png" media="(max-width: ${resize}px)" />\n`
      );
    });
  }
  html.push(
    `<img src='${fileDestination}${naming}.jpeg' alt="${naming}" />\n`
  );
  html.push(`</picture>\n`);

  fs.writeFileSync(`${htmlPatch}${naming}.txt`, html.join(""));
  return html.join("");

}

module.exports = generateHtml;