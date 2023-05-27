import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout/Layout';
import { routes } from '../routes';
import { CocktailDetail, Cocktails, Home } from '../views';

export const App = () => {
  return (
    // <h1 className='text-center font-black text-gray-700 text-4xl mb-10'>
    //   Home Page
    // </h1>
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='cocktails' element={<Cocktails />} />
          <Route path='cocktails/:cocktailId' element={<CocktailDetail />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  );
};
