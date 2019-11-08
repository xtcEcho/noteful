import React from 'react'
import moment from 'moment'
import './NoteMain.css'

class NoteMain extends React.Component{
    render(){
        const {name, modified, content} = this.props.note
        const date = 
                moment(new Date(modified)).format("Do MMM YYYY")
        return(
            <div className="NoteMain">
                <div className='note'>
                <h2 className='noteName'>
                    {name}
                </h2>
                <p className='date'>
                    Date modified on {date}
                </p>
                <button type='button'>Delete</button>
                </div>
                <p className="content">
                    {content}
                </p>
            </div>
        )
    }
}

export default NoteMain