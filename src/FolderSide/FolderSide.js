import React from 'react'
import {NavLink} from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './FolderSide.css'

class FolderSide extends React.Component{
    static contextType = NotefulContext
    static defaultProps = {
        folders : []
    }
    render(){
        const buttons = this.context.folders.map(
            (folder, i) => (
                <NavLink
                    to={`/folder/${folder.id}`}
                    key={i} activeClassName='highlighted'>
                    <button type='button'>
                        {folder.name}
                    </button>
                </NavLink>
            )
        )
        return(
            <div className="FolderSide">
                {buttons}
                <NavLink to={'/add-folder'}
                    activeClassName='highlighted'>
                        <button type="button">
                            Add folder
                        </button>
                </NavLink>
            </div>
        )
    }
}

export default FolderSide