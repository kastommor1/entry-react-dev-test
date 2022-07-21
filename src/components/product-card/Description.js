import React from "react";

import DOMPurify from 'dompurify';


class Description extends React.Component {
    render() {
        return (
            <div>
                <div className="description">{this.props.description}</div>
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.props.description) }}
                />
            </div>
        )
    }
}

export default Description;