import React from "react";
import { widthCategoryQueryByParams, widthParams } from "../service-functions/HOCs";
import { GET_CATEGORY } from "../apollo-client/queries";
import WarningMessage from "../components/Warning-message";
import { element } from "prop-types";
import ProductList from "../components/product-card/Product-list";
import Loading from "../components/Loading";
import { client } from "../apollo-client/cache";

import '../styles/Caregory.css';


class Category extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            error: false,
            data: false
        }

        this.getCategoryQuery = this.getCategoryQuery.bind(this);
    }

    getCategoryQuery() {
        let categoryName = this.props.params['categoryName'];
        let CategoryInput = { title: categoryName };

        client
            .query({
                query: GET_CATEGORY,
                variables: { input: CategoryInput }
            })
            .then(result => { this.setState({ data: result.data }) })
            .catch(error => { this.setState({ error: error }) })
            .finally(() => { this.setState({ loading: false }) });
    }

    componentDidMount() {
        // this.getCategoryQuery();
        let categoryName = this.props.params['categoryName'];
        let CategoryInput = { title: categoryName };

        client
            .query({
                query: GET_CATEGORY,
                variables: { input: CategoryInput }
            })
            .then(result => { this.setState({ data: result.data }) })
            .catch(error => { this.setState({ error: error }) })
            .finally(() => { this.setState({ loading: false }) });
    }

    // componentDidUpdate() {
    //     this.getCategoryQuery();
    // }

    // componentDidUpdate(){
    //     console.log('update');
    // }

    componentDidUpdate(){
        let categoryName = this.props.params['categoryName'];
        let CategoryInput = { title: categoryName };

        client
            .query({
                query: GET_CATEGORY,
                variables: { input: CategoryInput }
            })
            .then(result => { this.setState({ data: result.data }) })
            .catch(error => { this.setState({ error: error }) })
            .finally(() => { this.setState({ loading: false }) });
    }



    render() {
        // const { categoryName, categoriesName } = this.props;
        const { categoriesName, params } = this.props; //
        const categoryName = params['categoryName']; //


        if (categoriesName.filter(category => category.name == categoryName).length === 0) {
            return (
                <WarningMessage>
                    <h2>Ooops!</h2>
                    <p>There is no such category. ):</p>
                </WarningMessage>)
        } else {
            document.title = categoryName.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
        }


        // const { loading, error, data } = this.props.query;
        const { loading, error, data } = this.state;


        if (loading) return <Loading />;
        if (error) return <WarningMessage><p>Error. {error.message}.</p></WarningMessage>;
        if (!data && !data.category && data.category.products.length === 0) return <WarningMessage><p>No products</p></WarningMessage>;


        // console.log(data.category.products[1].attributes[0].items);
        // console.log(categoryName);

        return (
            <div className="category">
                <h2>{categoryName}</h2>
                <ProductList
                    products={data.category.products}
                    cart={this.props.cart}
                    onAddToCart={this.props.onAddToCart}
                    onDeleteFromCart={this.props.onDeleteFromCart}

                    currentCurrency={this.props.currentCurrency}
                />
            </div>
        )
    }
}

// const CategoryHOC = widthCategoryQueryByParams(Category, GET_CATEGORY, 'categoryName');
const CategoryHOC = widthParams(Category);

export default CategoryHOC;

