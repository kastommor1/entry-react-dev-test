import React from "react";
import loadingImg from "../data/loading.gif"
import "../styles/Loading.css"

class Loading extends React.Component{
    render(){
        return(
            <div className="loading">
                <img src={loadingImg} alt="loading" />
            </div>
        )
    }
}

export default Loading;