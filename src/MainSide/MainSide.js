import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './MainSide.css'

class MainSide extends Component{
    render(){
        const buttons = this.props.folders.map(
            (folder, i) => (
                <Link
                    to={`/folder/${folder.id}`}
                    key={i}>
                    <button type='button'>
                        Folder {i+1}
                    </button>
                </Link>
            )
        )
        // const tryout = this.props.folders
        return(
            <div className="MainSide">
                {buttons}
                <button type="button">
                    Add folder
                </button>
            </div>
            
        )
    }
}
export default MainSide

// MainSide.defaultProps = {
//     folders: []
// }

