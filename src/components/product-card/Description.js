import React from "react";

import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

//style
import "../../styles/product-card/Description.css";


class Description extends React.Component {
    render() {
        const clearDescription = parse(DOMPurify.sanitize(this.props.description));        
        
        return (
            <div className="description">{clearDescription}</div>
        )
    }
}

export default Description;