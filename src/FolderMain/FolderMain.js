import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './FolderMain.css'
import moment from 'moment';

class FolderMain extends React.Component{
    static contextType = NotefulContext
    static defaultProps = {
        notes: [],
    }
    render(){
        // console.log(this.context.notes)
        const folderNotes = this.context.notes.filter(note => 
            note.folderid == this.props.match.params.folderId
        )
        // console.log(folderNotes)
        const notes = folderNotes.map(
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
                    <button type='button' onClick={() => this.context.deleteNoteOutside(note.id)}>Delete</button>
                </div>
                )
            }
        )
        return(
            <div className="FolderMain">
                {notes}
                <Link to={'/add-note'} className='add-note'>
                <button type="button" onClick={() => this.context.updatePushLocation(this.props.location.pathname)}>Add note</button>
                </Link>
            </div>
        )
    }
}

export default FolderMain