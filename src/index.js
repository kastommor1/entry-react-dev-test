import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHOC from './App';


//apollo
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-client/cache"

//routes
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NotFound from './routes/NotFound';
import CategoryHOC from './routes/Category';
import Categories from './routes/Categories';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' 
          element={
          <ApolloProvider client={client}>
            <AppHOC />
          </ApolloProvider>
          }>            
          <Route path='categories' element={<Categories/>}>          
            <Route path=':categoryName' element={<CategoryHOC/>} />
          </Route>          

          {/* <Route path='' element={<Navigate to='/categories' />} /> */}
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>      
    </BrowserRouter>
        
  </React.StrictMode>
);

