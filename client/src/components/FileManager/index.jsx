import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TrashCan from "./trash-can.jsx";
import "./style.scss";

function FilesManager({ onFilesChange }) {
  const [Files, setFiles] = useState([]);

  useEffect(() => {
    onFilesChange(Files);
  }, [Files]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleFileRemove = (index) => {
    const newFiles = Files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div className="files_manager">
      <div className="files_manager-input">
        <input
          data-testid="file-input"
          id="fileInput"
          type="file"
          name="image"
          accept=".jpeg, .png, .gif"
          onChange={handleFileChange}
          multiple
        />
        <label htmlFor="fileInput" className="btn btn-secondary">
          Choisir les images
        </label>
      </div>

      <div className={Files.length > 0 ? "imgViewer" : "imgViewer none"}>
        {Files.map((file, index) => (
          <div key={index} className="imgViewer-item">
            <TrashCan onClick={() => handleFileRemove(index)} data-testid="trash-can"/>

            <img
              src={URL.createObjectURL(file)}
              alt={`thumbnail ${index}`}
              className="thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

FilesManager.propTypes = {
  onFilesChange: PropTypes.func,
};

export default FilesManager;
