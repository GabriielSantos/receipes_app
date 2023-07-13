import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { isSearch } = useContext(RecipesContext);
  return (
    <section>
      <Header />
      {
        (isSearch) ? <RecipesCard /> : <Recipes />
      }
      <Footer />
    </section>
  );
}
