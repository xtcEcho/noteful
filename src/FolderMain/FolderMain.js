import React from 'react'
import { Link } from 'react-router-dom'
import './FolderMain.css'
import moment from 'moment';

class FolderMain extends React.Component{
    render(){
        console.log(this.props.notes)
        const notes = this.props.notes.map(
            (note, i) => {
                const date = 
                moment(new Date(note.modified)).format("Do MMM YYYY")
                return (
                <div className='note' key={i}>
                    <Link
                        to={`/note/${note.id}`}
                        className="noteName">
                            <h2>
                                {note.name}
                            </h2>
                    </Link>
                    <p className='date' key={i}>
                        Date modified on {date}
                    </p>
                    <button type='button'>Delete</button>
                </div>
                )
            }
        )
        return(
            <div className="FolderMain">
                {notes}
                <button type="button">Add note</button>
            </div>
        )
    }
}

export default FolderMain