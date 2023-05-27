import { Section } from '../components/Section';
import { Loader } from '../components/Loader';
import { GoBackBtn } from '../components/GoBackBtn';
import { CocktailInfo } from '../components/CocktailInfo';
import { useLocation, useParams } from 'react-router-dom';
import { routes } from '../routes';
import { useEffect, useRef, useState } from 'react';
import { getCocktailDetail } from '../api/cocktail-service';

export const CocktailDetail = () => {
  const { cocktailId } = useParams()
  const [cocktail, setCocktail] = useState(null)
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)
  const location = useLocation()
  const backLink = useRef(location.state?.from ?? { pathname: '/' })

  useEffect(() => {
    (async () => {
      setIsloading(true)
      try {
        const data = await getCocktailDetail(cocktailId)
        setCocktail(data)
      } catch (error) {
        setError(error.message)
      }
      finally {
        setIsloading(false)
      }
    })()
  }, [cocktailId])

  return (
    <Section>
      <h1 className='uppercase text-4xl text-gray-600 text-center'>
        CocktailDetail
      </h1>
      < GoBackBtn path={backLink.current} />
      {cocktail && <CocktailInfo {...cocktail} />}
      {isloading && <Loader />}
    </Section>

  );
};
