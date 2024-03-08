import React, { useState } from "react";
import Banner from "../../components/Banner";
import Modal from "../../components/Modal";
import MyForm from "../../components/form";
import Footer from "../../components/Footer";
import "./style.scss";

export default function HomePage() {
  const [isOpenedModal, setIsOpenedModal] = useState(true);
  console.log(`Vous rencontrez une erreur ? \nVous découvrez une failles de sécurité ? \nVous avez des suggestions d' amélioration? \nN'hésitez pas à faire une issues sur : \nhttps://github.com/aurelienLRY/ImageProcessor-Pro/issues`);

  return (
    <>
      <Modal
        isOpen={isOpenedModal}
        setIsOpen={() => setIsOpenedModal(false)}
        title="Image Processor Pro"
      >
        <p>
          <strong>Application web</strong> conçue pour simplifier le processus
          d'intégration d'images dans les projets web responsive.
        </p>
        <h3>Fonctionnalités principales</h3>
        <ol>
          <li>
            Redimensionnement d'Images : Permets à l'utilisateur de préciser les
            dimensions souhaitées pour les images.
          </li>
          <li>
            Compression d'Images : Offre la possibilité de compresser les images
            selon différents niveaux.
          </li>
          <li>
            Formats Multiples : Prend en charge plusieurs formats d'image tels
            que JPEG, PNG et GIF.
          </li>
          <li>
            Génération de Code d'Intégration : Crée un fichier texte avec le
            code HTML ou JSX nécessaire pour intégrer les images dans un projet
            web.
          </li>
          <li>
            Dossier ZIP : Rassemblez toutes les images redimensionnées dans un
            dossier zip organisé par image, accompagné du fichier texte et du
            fichier jsx.
          </li>
        </ol>
        <h3>Pourquoi réinventer la roue ? </h3>
        <p>
          Ce projet a été mené à bien dans le cadre de ma formation en tant
          qu'intégrateur web.{" "}
        </p>
        <p>
          Mon objectif principal était de mettre en pratique les connaissances
          fraîchement acquises et d'approfondir mes compétences dans le
          développement backend, en utilisant une pile Javascript.
        </p>
      </Modal>
      <Banner
        urlImg={"./img/matt-artz-4mAcustUNPs-unsplash.jpg"}
        title={"Image processor pro"}
      >
        Simplifiez vous le processus d'intégration d'images.
      </Banner>
      <main className="home-main">
        <MyForm />
      </main>
      <Footer />
    </>
  );
}
