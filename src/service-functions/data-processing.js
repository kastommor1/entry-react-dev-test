export function productWithAttributes(product, attributeId, itemId){
    let clearProduct = JSON.parse(JSON.stringify(product));

    if(attributeId && itemId){
        //set one attribute
        for (const attribute of clearProduct.attributes) {
            if(attribute.id === attributeId){          
  
              for (const item of attribute.items) {                           
                if(item.id === itemId){
                  item.selected = true;                
                }
                else if(item.selected){
                  delete item.selected                
                }       
              }
  
              break
            }                              
          }
    }else{
        //set default attributes
        for (let i = 0; i < clearProduct.attributes.length; i++) {
            clearProduct.attributes[i].items[0].selected = true;
        }

        // for (const attribute of clearProduct.attributes) {
        //     attribute.items[0].selected = true;                        
        // }
    }

    return clearProduct;

}