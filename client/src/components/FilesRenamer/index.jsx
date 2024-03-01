import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PenNib from "./penNib";
import "./style.scss";

function FilesRenamer({image , onRename}) {
  const [myFiles, setMyFiles] = useState(image);
  const [rename, setRenamer] = useState({});

  useEffect(() => {
    setMyFiles(image);
    const newRename = { ...rename };
    Object.keys(rename).forEach((key) => {
      if (!image[key]) {
        delete newRename[key];
      }
    });
    setRenamer(newRename);
  }, [image]);

  useEffect(() => {
    onRename(rename);
  }, [rename]);

  const handlenameChange = (index, e) => {
    const value = e.target.value;
    const res = value.replace(/\s/g, "_").toLowerCase();
    setRenamer({...rename , 
      [index] : res});
    console.log(rename);
  }

  return (
    <div className="files-naming" data-testid="files-renamer">
      <div className="files-naming-header">
      <h2> <PenNib/> Naming </h2>
      <p><strong>Renommé vos images.</strong> <br/>Les noms d'origines seront remplacer lors de la génération du fichier </p>
      </div>
      {Array.isArray(myFiles) &&
        myFiles.map((file, index) => (
          <div key={index} className="files-naming-item" data-testid="file-item">
            <img
              src={URL.createObjectURL(file)}
              alt={`thumbnail ${index}`}
              className="thumbnail"
            />
            <p>{file.name} </p> 
            <input type="text" placeholder="Renseigner son nouveau nom" onBlur={(e)=>handlenameChange(index, e)}/>
          </div>
        ))}
    </div>
  );
}

FilesRenamer.propTypes = {
  image: PropTypes.array,
};

export default FilesRenamer;
