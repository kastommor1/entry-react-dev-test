import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//routes
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Category1 from './routes/Category1';
import Category2 from './routes/Category2';
import NotFound from './routes/NotFound';

//apollo
import { ApolloProvider, gql } from "@apollo/client";
import { client } from "./apollo-client/cache"

// const GET_CATEGORIES = gql`
//     query GetCategories {
//         categories {
//             name
//             products{
//                 id
//                 name
//             }
//         }
//     }
// `;

// client.query({
//   query: GET_CATEGORIES
// })
// .then(res=>{console.log(res);})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' 
          element={
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
          }>
            
          <Route path='categories/category1' element={<Category1/>} />
          <Route path='categories/category2' element={<Category2/>} />

          {/* <Route path='' element={<Navigate to='/categories/category1' />} /> */}
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>      
    </BrowserRouter>
        
  </React.StrictMode>
);

