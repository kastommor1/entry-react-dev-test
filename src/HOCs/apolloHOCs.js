import { useQuery } from "@apollo/client";


export function widthQuery (Coponent, queryName, options={}){
    return function WidthQuery(props){
        const query = useQuery(queryName, options);  

        return <Coponent {...props} query = {query}/>
    }
}