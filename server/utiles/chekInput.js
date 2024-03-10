/**
 * Checks the inputs for validity.
 * @param {Object} settings - The settings object.
 * @param {Array} files - The files array.
 * @returns {(string|boolean)} - Returns an error message if inputs are invalid, otherwise returns false.
 */
function CheckInputs(settings, files) {
  const compressed = JSON.parse(settings.settings).compressed;
  const dimensions = JSON.parse(settings.settings).dimensions;

  if (!files) {
    return "Fichier requis";
  }
  if (!settings.naming) {
    return "naming is required";
  }
  files.map((file, index) => {
    if (!settings.naming[index]) {
      return `l\'image "${file.name}" nécessite d\'être nommée`;
    }
  });
  if (!dimensions) {
    return "Valeur de redimensionnement requise";
  }
  if (
    !compressed.jpeg.checked &
    !compressed.webp.checked &
    !compressed.png.checked
  ) {
    return "Au moins un format est requis";
  } else {
    return false;
  }
}

module.exports = CheckInputs;
