import React from "react";
import Footer from "./Footer";
import StoreList from "./StoreList";
import StoreSearch from "./SearchStore";
import HomeText from "./HomeText";

function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-300 to-purple-300">
        <HomeText />
        <StoreSearch />
      </section>
      <article className="bg-gradient-to-r from-blue-100 to-purple-100">
      <StoreList />
        <Footer />
      </article>
    </>
  );
}

export default Home;
