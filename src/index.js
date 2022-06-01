import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHOC from './App';


//apollo
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-client/cache"

//routes
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CategoryHOC from './routes/Category';

//components
import WarningMessage from './components/Warning-message';



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

          <Route path='categories/:categoryName' element={<CategoryHOC/>} />     
          <Route path='*' element={
            <WarningMessage>
              <h2>404</h2>
              <p>Page not found</p>
            </WarningMessage>
          } />          
        </Route>
      </Routes>      
    </BrowserRouter>
        
  </React.StrictMode>
);

