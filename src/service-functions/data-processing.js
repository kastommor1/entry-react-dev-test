export function productWithAttributes(product, attributeId, itemId) {
    let clearProduct;

    if (attributeId && itemId) {
        clearProduct = productWithNewAttributes(product, attributeId, itemId);
        return clearProduct;                
    }

    clearProduct = productWithDefaultAttributes(product);  

    return clearProduct;
}

export function productWithNewAttributes(product, attributeId, itemId) {
    let clearProduct = JSON.parse(JSON.stringify(product));

    //set one attribute
    for (const attribute of clearProduct.attributes) {
        if (attribute.id === attributeId) {

            for (const item of attribute.items) {
                if (item.id === itemId) {
                    item.selected = true;
                }
                else if (item.selected) {
                    delete item.selected
                }
            }

            break
        }
    }

    return clearProduct;
}

export function productWithDefaultAttributes(product) {
    let clearProduct = JSON.parse(JSON.stringify(product));

    for (let i = 0; i < clearProduct.attributes.length; i++) {
        clearProduct.attributes[i].items[0].selected = true;
    }

    // for (const attribute of clearProduct.attributes) {
    //     attribute.items[0].selected = true;                        
    // }

    return clearProduct;
}