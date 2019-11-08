import React from 'react'
import {withRouter} from 'react-router-dom'
import './NoteSide.css'

class NoteSide extends React.Component{
    render(){
        let folderName
        this.props.folders.find((folder, i) =>{
            if (folder.id ===this.props.note.folderId){
                folderName = `Folder ${i + 1}`
            }
        })
        console.log(folderName)
        return(
            <div className='NoteSide'>
                <button type='button' 
                onClick={this.props.onBack}>
                    Go back
                </button>
                <p>
                    {folderName}
                </p>
            </div>
        )
    }
}

export default withRouter(NoteSide)