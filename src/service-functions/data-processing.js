export function setDefaultAttributes(product) {
    //deep copy 
    let selectedProduct = JSON.parse(JSON.stringify(product));
    //set default attributes
    for (let i = 0; i < selectedProduct.attributes.length; i++) {
        selectedProduct.attributes[i].items[0].selected = true;
    }

    selectedProduct.quantity =  1;

    return selectedProduct;
}

export function setHashId(product) {
    //deep copy 
    let selectedProduct = JSON.parse(JSON.stringify(product));

    //set hash id
    selectedProduct.hashID = 'id=' + selectedProduct.id + '/attributes';
    for (let i = 0; i < selectedProduct.attributes.length; i++) {

        //set attribute id
        const attribute = selectedProduct.attributes[i];
        selectedProduct.hashID = selectedProduct.hashID + '/' + attribute.id + '=';

        //set selected item id
        for (let i = 0; i < attribute.items.length; i++) {
            if (attribute.items[i].selected) {
                selectedProduct.hashID = selectedProduct.hashID + attribute.items[i].id;
            }
        }
    }

    return selectedProduct;
}