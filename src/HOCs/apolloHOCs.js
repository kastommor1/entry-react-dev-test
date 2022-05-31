import { useQuery } from "@apollo/client";

export function widthQuery (Coponent){
    return function WidthQuery(props){
        const query = useQuery;

        return <Coponent {...props} query = {query}/>
    }
}