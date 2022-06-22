import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import AppHOC from './App';
import App from './App';

//apollo
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-client/cache"

//routes
import { BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

