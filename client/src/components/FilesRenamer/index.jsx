import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import PenNib from "./penNib"; // import the penNib icon
import "./style.scss";

function FilesRenamer({ image, onRename }) {
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
    setRenamer({ ...rename, [index]: res });
    console.log(rename);
  };

  return (
    <div className="files-naming" data-testid="files-renamer">
      <div className="files-naming-header">
        <h2>
          <PenNib /> Naming
        </h2>
        <Tooltip title="Les noms d'origines seront remplacés lors de la génération du fichier.">
          <strong>Renommez vos images.</strong>
        </Tooltip>
      </div>

      <table className="files-naming-table">
        <thead>
          <tr className="table-header">
            <th>Image</th>
            <th>Nom d'origine</th>
            <th>Nouveau nom </th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(myFiles) &&
          myFiles.map((file, index) => (
            <tr
              key={index}
              className="files-naming-item"
              data-testid="file-item"
            >
              <td>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`thumbnail ${index}`}
                  className="thumbnail"
                />
              </td>

              <td>
                <p>{file.name} </p>
              </td>
              <td>
                <Tooltip title="Renseigner le nouveau nom de l'image">
                  <input
                    data-testid="file-input"
                    type="text"
                    placeholder="Nouveau nom"
                    onBlur={(e) => handlenameChange(index, e)}
                    required
                  />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesRenamer.propTypes = {
  image: PropTypes.array,
  onRename: PropTypes.func,
};

export default FilesRenamer;
