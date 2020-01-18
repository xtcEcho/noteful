import React from 'react'
import config from '../config'
import NotefulContext from "../NotefulContext"
import PostError from '../PostError/PostError'
import './AddFolder.css'
import ValidationError from '../ValidationError'

class AddFolder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            folderName: '',
            touched: false,
        }
    }
    static contextType = NotefulContext
    updateFolderName(folderName){
        this.setState({
            folderName : folderName,
            touched: true
        })
    }

    validateFolderName(){
        const names = this.context.folders.map(
            folder => folder.name
        )
        const name = this.state.folderName.trim()
        if(name.length === 0){
            return "Folder name is required"
        } else if (names.indexOf(name) > 0){
            return "Folder name exists"
        }
    }

    handleSubmit = e =>{
        e.preventDefault()
        const {folderName} = e.target
        const folder = {
            name: folderName.value
        }
        fetch(config.API_FOLDER_ENDPOINT, {
            method:"POST",
            body: JSON.stringify(folder),
            headers:{
                'content-type': 'application/json',
                }
            })
            .then(res => {
                return res.json()
            })
            .then(dataJson =>
                {   
                    this.context.fetchAllFolders()
                    this.props.history.push(`/folder/${dataJson.id}`)
                }
                
            ).catch(error => console.log(error))
        
        
    }
    render(){
        return (
            <section className='AddFolder'>
                <h2>Create a new folder</h2>
                    <form className='AddFolder-form' onSubmit={this.handleSubmit}>
                        <label htmlFor='folderName'>
                            Folder name <br/>
                        </label>
                        <input 
                            type='text' id='folderName' onChange={e => this.updateFolderName(e.target.value)}
                            required /><br/>
                            {this.state.touched ? (<ValidationError msg={this.validateFolderName()}/>) : <p></p>}
                        <button type='submit' 
                            disabled={this.validateFolderName()}>
                            Add
                        </button>
                    </form>

            </section>
        )
    }
}

export default AddFolder