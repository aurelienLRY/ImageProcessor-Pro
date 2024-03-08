import { useState } from "react";
import FilesManager from "../FileManager";
import FilesRenamer from "../FilesRenamer";
import Setting from "../setting";
import DestinationManager from "../DestinationManager";
import TechnologyManager from "../TechnologyManager";
import Modal from "../Modal";
import Spinner from "../Spinner";
import "./style.scss";


function MyForm() {
  const [formValues, setFormValues] = useState({});
  const [modalContent, setModalContent] = useState(null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const handleFormChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpenedModal(true);
    if (formValues.image) {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "image") {
          value.forEach((file, index) => {
            formData.append(`image${index + 1}`, file);
          });
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      fetch(`${import.meta.env.VITE_APP_API_URL}/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
           if (!response.ok) {
            if(response.status === 400){
              return response.json().then((data) => {
                setIsOpenedModal(true);
                setModalContent(data.error);
               console.log(data.error);
              });
            }
            if(response.status === 500){
              return response.json().then((data) => { 
                setIsOpenedModal(true);
                setModalContent(data.error);
                console.log(data.error);
              });
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          if (blob.size > 0) {
            const url = window.URL.createObjectURL(blob);
            setModalContent(
             <>
                <p>Le fichier zip est prêt à être téléchargé</p>
                <a href={url} download="imageProcessor.zip" className="btn">
                  Télécharger
                </a>
             </>
            );



           /* const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "imageProcessor.zip";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);*/
          } else {
            console.error("Le fichier zip reçu est vide.");
          }
        })
        .catch((error) => console.error("Une erreur s'est produite: ", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Modal isOpen={isOpenedModal} setIsOpen={setIsOpenedModal} >
        { modalContent ? modalContent : (<Spinner />)}
      </Modal>
      <FilesManager
        onFilesChange={(files) => handleFormChange("image", files)}
      />
      {formValues.image && formValues.image.length > 0 && (
        <>
          <FilesRenamer
            image={formValues.image}
            onRename={(rename) => handleFormChange("naming", rename)}
          />
          <Setting
            onSetting={(settings) => handleFormChange("settings", settings)}
          />
          <DestinationManager
            onDestination={(destination) =>
              handleFormChange("destination", destination)
            }
          />
          <TechnologyManager
            onTechnologyChange={(technologies) =>
              handleFormChange("technology", technologies)
            }
          />
        </>
      )}
      <div className="submit-content">
        <button
          type="submit"
          className={
            formValues.image && formValues.image.length > 0
              ? "btn"
              : "btn hidden"
          }
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}

export default MyForm;
