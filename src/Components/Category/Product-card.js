import React from "react";

class ProductCard extends React.Component {
    


    render(){
        const {id, name, inStock, gallery, prices, brand} = this.props.product
        return (
            <div style={{border: '1px solid black'}}>
                <img src={gallery[0]} alt=""  style={{height: 150}}/>
                <p>{brand} {name}</p>
                <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>
                <button onClick={()=>{console.log(id);}}>Add to cart</button>                
            </div>
        )
    }
}

export default ProductCard


// export const GET_CATEGORY = gql`
//     query GetCategory($input: CategoryInput){
//         category(input: $input){
//             name
//             products{
//                 id
//                 name
//                 inStock
//                 gallery
//                 prices{
//                     currency{
//                         label
//                         symbol
//                     }
//                     amount
//                 }
//                 brand
//             }
//         }
//     }
// `;