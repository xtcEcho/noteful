import React from 'react'
import {withRouter} from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './NoteSide.css'

class NoteSide extends React.Component{
    render(){
        return(
            <NotefulContext.Consumer>
                {(context) => {
                    const note = context.notes.find(note => 
                        note.id === this.props.match.params.noteId)
                    let folderName
                    context.folders.find((folder, i) =>{
                        if (folder.id ===note.folderId){
                            folderName = `Folder ${i + 1}`
                        }
                    })
                    return(
                        <div className='NoteSide'>
                            <button type='button' 
                             onClick={() =>this.props.history.goBack()}>
                                Go back
                            </button>
                            <p>
                                {folderName}
                            </p>
                        </div>
                    )
                    
                }}
            </NotefulContext.Consumer>
        )
    }
}

export default withRouter(NoteSide)