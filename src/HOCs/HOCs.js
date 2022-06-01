import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";


export function widthQuery (Coponent, queryName){
    return function WidthQuery(props){
        const query = useQuery(queryName);  

        return <Coponent {...props} query = {query}/>
    }
}

// export function widthParams (Coponent){
//     return function WidthParams(props){
//         const params = useParams();  

//         return <Coponent {...props} params = {params}/>
//     }
// }

export function widthQueryByParams (Coponent, queryName, parameterName){
    return function WidthQueryByParams(props){
        const params = useParams();
        const categoryName = params[parameterName];     

        const CategoryInput ={title: categoryName};        
        const query = useQuery(queryName, {
            variables: {input: CategoryInput}} );        

        return <Coponent {...props} categoryName = {categoryName} query = {query}/>
    }
}