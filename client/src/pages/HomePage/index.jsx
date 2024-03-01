import React from "react";
import Banner from "../../components/Banner";
import MyForm from "../../components/form";

export default function HomePage() {
  return (
    <main className="home-main">
      <Banner urlImg={"./img/matt-artz-4mAcustUNPs-unsplash.jpg"} title={"Image processor pro"}>
      Simplifiez vous le processus d'intégration d'images.
      </Banner>
      <MyForm />
    </main>
  );
}
