import React from "react";
import  '../../styles/Cart/Attributes.css'

class Attributes extends React.Component {

    render() {
        return (
            <div className="attributes">
                {this.props.attributes.map((attribute, index) => {
                    // if (index >2){
                    //     return ;
                    // } else if (index === 2) {
                    //     return <button className="details-btn">Show details</button>
                    // }

                    return (
                        <div key={attribute.id}>
                            <p>{attribute.name}:</p>
                            <div>
                                {attribute.items.map(item => {
                                    const selectedClass = item.selected ? ' selected' : '';
                                    const selectedColorClass = item.selected ? ' selected-color' : '';
                                    if (attribute.id === 'Color') {
                                        const whiteClass = item.displayValue.toLocaleLowerCase() === 'white'
                                            ? ' white-square' : '';
                                        return <button
                                            className={"color-button" + selectedColorClass + whiteClass}
                                            key={item.id}
                                        >
                                            <div className="colored-square" style={{ backgroundColor: item.value }}></div>
                                        </button>
                                    }

                                    return <button
                                        key={item.id}
                                        className={selectedClass}>
                                        {item.displayValue}</button>
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