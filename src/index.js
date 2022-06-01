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




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' 
          element={
          <ApolloProvider client={client}>
            <AppHOC />
          </ApolloProvider>
          }>            
          <Route path='categories/:categoryName' element={<CategoryHOC/>} />

          {/* <Route path='' element={<Navigate to='/categories/category1' />} /> */}
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>      
    </BrowserRouter>
        
  </React.StrictMode>
);

