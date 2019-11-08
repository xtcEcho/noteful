import React from 'react'
import {NavLink} from 'react-router-dom'
import './FolderSide.css'

class FolderSide extends React.Component{
    render(){
        const buttons = this.props.folders.map(
            (folder, i) => (
                <NavLink
                    to={`/folder/${folder.id}`}
                    key={i} activeClassName='highlighted'>
                    <button type='button'>
                        Folder {i + 1}
                    </button>
                </NavLink>
            )
        )
        return(
            <div className="FolderSide">
                {buttons}
                <button type="button">
                    Add folder
                </button>
            </div>
        )
    }
}

export default FolderSide