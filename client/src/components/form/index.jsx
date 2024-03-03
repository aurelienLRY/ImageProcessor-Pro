import React, { useState } from "react";
import FilesManager from "../FileManager";
import FilesRenamer from "../FilesRenamer";
import Setting from "../setting";
import DestinationManager from "../DestinationManager";
import TechnologyManager from "../TechnologyManager";
import "./style.scss";

function MyForm() {
  const [formValues, setFormValues] = useState({});
  const { image } = formValues;

  const handleFileChange = (files) => {
    setFormValues({
      ...formValues,
      image: files,
    });
  };

  const handleRename = (rename) => {
    setFormValues({
      ...formValues,
      naming: rename,
    });
  };

  const handleSettings = (settings) => {
    setFormValues({
      ...formValues,
      settings: settings,
    });
  };

  const handleDestination = (destination) => {
    setFormValues({
      ...formValues,
      destination: destination,
    });
  };

  const handleTechnology = (technologies) => {
    setFormValues({
      ...formValues,
      technology: technologies,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT>>>>>", formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FilesManager onFilesChange={handleFileChange} />
      {image && image.length > 0 && (
        <>
          <FilesRenamer image={formValues.image} onRename={handleRename} />
          <Setting onSetting={handleSettings} />
          <DestinationManager onDestination={handleDestination} />
          <TechnologyManager onTechnologyChange={handleTechnology} />
        </>
      )}
      <div className="submit-content">
        <button
          type="submit"
          className={image && image.length > 0 ? "btn" : "btn hidden"}
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}

export default MyForm;
