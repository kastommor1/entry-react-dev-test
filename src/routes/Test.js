import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../apollo-client/queries"

export default function Test (){
    const categoryInput = { title: 'clothes' }
    const {loading, error, data} = useQuery(GET_CATEGORY, {variables: {input: categoryInput}});

    if (loading) return <p>loading</p>
    if (error) return <p>error</p>
    // console.log(data.category.products);


    const some = 5+5;



    return(
        <div>
            <h1>Test</h1>
            <p>Some {some}</p>
        </div>
    )
}