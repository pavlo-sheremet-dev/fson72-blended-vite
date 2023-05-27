import { CocktailsList } from '../components/CocktailsList';
import { Section } from '../components/Section';
import { Loader } from '../components/Loader';
import { useEffect } from 'react';
import { getTrendingCocktails } from '../api/cocktail-service';
import { useState } from 'react';

export const Home = () => {
  const [cocktails, setCocktails] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // const asyncWrapper = async () => {
    //   const data = await getTrendingCocktails()
    // }
    // asyncWrapper()

    (async () => {
      setIsloading(true)
      try {
        const data = await getTrendingCocktails()
        setCocktails(data)
      } catch (error) {
        setError(error.message)
      }
      finally {
        setIsloading(false)
      }
    })()
  }, [])

  return (
    <>
      <Section>
        <h1 className='text-center font-black text-gray-700 text-4xl mb-10'>
          Trending cocktails
        </h1>

        <CocktailsList cocktails={cocktails} />
      </Section>
      {isloading && <Loader />}
    </>
  );
};
