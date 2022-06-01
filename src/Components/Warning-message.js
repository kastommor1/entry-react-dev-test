import React from "react";

class WarningMessage extends React.Component{
    render(){
        return (
          <div>
              {this.props.children}
          </div>
        )
    }
}

export default WarningMessage;