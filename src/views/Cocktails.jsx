import { SearchForm } from '../components/SearchForm';
import { Section } from '../components/Section';
import { CocktailsList } from '../components/CocktailsList';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { searchByName } from '../api/cocktail-service';
import { useEffect, useState } from 'react';

export const Cocktails = () => {
  const [searchParams] = useSearchParams()
  const [cocktails, setCocktails] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)
  const query = searchParams.get('query')

  useEffect(() => {
    // const asyncWrapper = async () => {
    //   const data = await getTrendingCocktails()
    // }
    // asyncWrapper()
    if (!query) {
      return
    }

    (async () => {
      setIsloading(true)
      try {
        const data = await searchByName(query)
        setCocktails(data)
      } catch (error) {
        setError(error.message)
      }
      finally {
        setIsloading(false)
      }
    })()
  }, [query])

  return (
    <>
      <Section>
        <h1 className='uppercase text-4xl text-gray-600 text-center'>
          Search Cocktails
        </h1>

        <SearchForm />
        <CocktailsList cocktails={cocktails} />
        {isloading && <Loader />}
      </Section>
    </>
  );
};
