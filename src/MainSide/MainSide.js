import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './MainSide.css'

class MainSide extends Component{
    static contextType = NotefulContext
    static defaultProps = {
        folders : [],
    }
    render(){
        const buttons = this.context.folders.map(
            (folder, i) => (
                <Link
                    to={`/folder/${folder.id}`}
                    key={i}>
                    <button type='button'>
                        {folder.name}
                    </button>
                </Link>
            )
        )
        // const tryout = this.props.folders
        return(
            <div className="MainSide">
                {buttons}
                <NavLink to='/add-folder'
                    activeClassName='highlighted'>
                    <button type="button">
                        Add folder
                    </button>
                </NavLink>
            </div>
            
        )
    }
}
export default MainSide

// MainSide.defaultProps = {
//     folders: []
// }

