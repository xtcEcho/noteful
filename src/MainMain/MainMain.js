import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './MainMain.css'
import moment from 'moment';

class MainMain extends React.Component {
    render(){
        return(
            <NotefulContext.Consumer>
            {(context) => {
                const notes = context.notes.map(
                    (note, i) => {
                        const date = 
                        moment(new Date(note.modified)).format("Do MMM YYYY")
                        return (
                        <div className='note' key={i}>
                            <Link
                                to={`/note/${note.id}`}
                                className='noteName'>
                                    <h2>
                                        {note.name}
                                    </h2>
                            </Link>
                            <p className='date' key={i}>
                                Date modified on {date}
                            </p>
                            <button type='button' onClick={() => context.deleteNoteOutside(note.id)}>Delete</button>
                        </div>
                        )
                    }
                )
                return(
                    <div className="MainMain">
                        {notes}
                        <Link to={'/add-note'} className='add-note'>
                            <button type="button" onClick={() => context.updatePushLocation("/")}>Add note</button>
                        </Link>
                    </div>
                )
            }}
            </NotefulContext.Consumer>
        )
       
    }
}

export default MainMain