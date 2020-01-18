import React from 'react'
import {withRouter} from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './NoteSide.css'

class NoteSide extends React.Component{
    render(){
        return(
            <NotefulContext.Consumer>
                {(context) => {
                    console.log(context.notes)
                    // console.log(this.props.match.params.noteId)
                    const note = context.notes.find(n => 

                        n.id == this.props.match.params.noteId)
                    // console.log(note)    
                    let folderName
                    context.folders.find((folder, i) =>{
                        if (folder.id == note.folderid){
                            folderName = folder.name
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