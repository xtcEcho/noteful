import React from 'react'
import moment from 'moment'
import NotefulContext from '../NotefulContext'
import './NoteMain.css'
import config from '../config'

class NoteMain extends React.Component{
    static contextType = NotefulContext
    static defaultProps = {
        notes:[]
    }
    deleteNote = (noteId, callback) =>{
        fetch(`${config.NOTE_ENDPOINT}/${noteId}`, {
            method:'DELETE',
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok){
                throw new Error(res.status)
            }
            return res.json()
        }).then(data =>{
            this.props.history.push('/')
            callback(noteId)
        }).catch(error =>{
            console.log(error)
        })
    }
    render(){
        const note = this.context.notes.find(note =>
            note.id === this.props.match.params.noteId
          )
        const {name, modified, content} = note
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
                <button type='button' onClick={() => this.deleteNote(note.id, this.context.deleteNoteInside)}>Delete</button>
                </div>
                <p className="content">
                    {content}
                </p>
            </div>
        )
    }
}

export default NoteMain