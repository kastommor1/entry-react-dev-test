import React from "react";
import "../styles/Modal.css"

class Modal extends React.Component {
    render() {
        return (
            <div
                className={"modal" + (this.props.showModal ? ' modal-show' : '')}
            >
                <div
                    className="eclipse"
                    onClick={()=>{this.props.onToggleModal()}}
                >
                    <div className="header-eclipse"></div>
                    <div className="main-eclipse"></div>
                </div>

                {this.props.children} 

            </div>
        )
    }
}

export default Modal;