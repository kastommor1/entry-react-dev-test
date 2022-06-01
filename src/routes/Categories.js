import React from "react";
import { Outlet, Navigate, Routes, Route } from 'react-router-dom';
import NotFound from "./NotFound";

import { getCategoriesName } from '../data'


class Categories extends React.Component{
    render(){
        console.log(getCategoriesName());
        
        const staticCategories = [
            {name: 'all'},
            {name: 'clothes'},
            {name: 'tech'},
        ];



        return (
           <div>
               <Routes>
                    <Route path='' element={<Navigate to={'/categories/' + staticCategories[0].name} />} />                    
               </Routes>                              
                <Outlet/>
           </div>
        )
    }
}

export default Categories;