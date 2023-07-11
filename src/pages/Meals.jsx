import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <section>
      <Header />
      <Recipes />
      <Footer />
    </section>
  );
}

export default Meals;
