import React,{useEffect} from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Calculator from './pages/Calculator';
import PageNotFound from './components/PageNotFound';
import News from './pages/News';

const router = createBrowserRouter(
    //create routes from elements
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} >
            <Route index element={<Home />}/>
            <Route path="calculator" element={<Calculator />} />
            <Route path="news" element={<News />} />
            <Route path='*' element={<PageNotFound />}/>
        </Route>
    )
)

export default function App() {
    useEffect(() => {
        document.documentElement.classList.add('light');
      }, []);
  return (

        <RouterProvider router={router}/>
  )
  
}
