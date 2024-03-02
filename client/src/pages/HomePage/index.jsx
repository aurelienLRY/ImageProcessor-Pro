import React from "react";
import Banner from "../../components/Banner";
import MyForm from "../../components/form";
import Footer from "../../components/Footer";
import "./style.scss";

export default function HomePage() {
  return (
    <>
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
