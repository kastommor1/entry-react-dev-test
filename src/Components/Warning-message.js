import React from "react";
import "../styles/Warning-message.css"

class WarningMessage extends React.Component{
    render(){
        return (
          <div className="warning-message">
              {this.props.children}
          </div>
        )
    }
}

export default WarningMessage;