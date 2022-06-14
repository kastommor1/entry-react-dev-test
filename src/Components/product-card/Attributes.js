import React from "react";
import  '../../styles/product-card/Attributes.css'

class Attributes extends React.Component {

    render() {
        const {productId, attributes, onAttributeChange} = this.props;
        return (
            <div className="attributes">
                {attributes.map((attribute, index) => {
                    // if (index >2){
                    //     return ;
                    // } else if (index === 2) {
                    //     return <button className="details-btn">Show details</button>
                    // }

                    return (
                        <div key={attribute.id}>
                            <p>{attribute.name}:</p>
                            <div className="attribute">
                                {attribute.items.map(item => {                                    
                                    
                                    if (attribute.id === 'Color') {
                                        const selectedColorClass = item.selected ? ' selected-color' : '';
                                        const whiteClass = item.displayValue.toLocaleLowerCase() === 'white'
                                            ? ' white-square' : '';
                                        return <button                                            
                                            className={"color-button" + selectedColorClass + whiteClass}
                                            key={item.id}
                                            onClick={()=>{onAttributeChange(productId, attribute.id, item.id)}}
                                        >
                                            <div className="colored-square" style={{ backgroundColor: item.value }}></div>
                                        </button>
                                    }

                                    const selectedClass = item.selected ? ' selected' : '';
                                    return <button
                                        key={item.id}
                                        className={selectedClass}
                                        onClick={()=>{onAttributeChange(productId, attribute.id, item.id)}}                                        
                                        >
                                        {item.value}</button>
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )

    }
}

export default Attributes;