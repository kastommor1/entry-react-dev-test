import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//routes
import Category1 from './routes/Category1';
import Category2 from './routes/Category2';
import NotFound from './routes/NotFound';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='category1' element={<Category1/>} />
          <Route path='category2' element={<Category2/>} />

          <Route path='' element={<Navigate to='/category1' />} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>      
    </BrowserRouter>
        
  </React.StrictMode>
);

