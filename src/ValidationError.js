import React from 'react'

class ValidationError extends React.Component{
    render(){
        if (this.props.msg){
            return(
                <div className="ValidationError">
                    <p>{this.props.msg}</p>
                </div>
            )
        }
        return (
            <></>
        )
    }
}

export default ValidationError