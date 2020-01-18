import React from 'react'
import PostError from '../PostError/PostError'
import NotefulContext from '../NotefulContext'
import ValidationError from '../ValidationError'
import config from '../config'
import './AddNote.css'
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
class AddNote extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            noteName : '',
            touched: false,
        }
    }
    static contextType = NotefulContext
    static defaultProps = {
        folders: [],
    }

    updateNoteName(noteName){
        this.setState({
            noteName: noteName,
            touched: true,
        })
    }

    validateNoteName(){
        const name = this.state.noteName.trim()
        if(name.length === 0){
            return "Note name is required"
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        const {noteName, selectFolder, content} = e.target
        let time = new Date()
        const note = {
            name: noteName.value,
            folderid: selectFolder.value,
            content: content.value,
            modified: time.toISOString(),
        }
        fetch(config.API_NOTE_ENDPOINT, {
            method:"POST",
            body: JSON.stringify(note),
            headers:{
                'content-type': 'application/json',
                }
            })
            .then(res => {
                // if (!res.ok){
                //     throw new Error(res.status)
                // }
                return res.json()
            }).then(data =>
                {
                    this.context.fetchAllNotes()
                    this.props.history.push(`/folder/${data.folderid}`)
                }
                
            ).catch(error => console.log(error))
    }
   
    render(){
        const folderId = this.context.folderLocation.substr(8)
        let oldIndex
        this.context.folders.map((folder, i) =>
            {
                if(folder.id === folderId){
                    oldIndex = i
                }

            })
        let tempFolders = this.context.folders.slice()
        tempFolders.move(oldIndex, 0)
        const options = tempFolders.map(
            (folder, i) => (
                <option value={folder.id} key={i} >{folder.name}</option>
            )  
        )   
        console.log(options[0])     
        return(
            <section className='AddNote'>
                <h2>Create a new note</h2>
            
                    <form className='AddNote-form' onSubmit={this.handleSubmit}>
                        <label htmlFor='noteName'>
                            Note name <br/>
                        </label>
                        <input type='text' id='noteName'
                            onChange={e => this.updateNoteName(e.target.value)}/><br/>
                        {this.state.touched && (
                            <ValidationError msg={this.validateNoteName()}/>
                        )}
                        <label htmlFor='select-folder'>
                            Select a folder <br/>
                        </label>
                        <select id='selectFolder' name='selectFolder'>
                            {options}
                        </select><br/>
                        <label htmlFor='content'>
                            Content <br/>
                        </label>
                        <textarea id='content'></textarea>
                        <button type="submit"
                            disabled={
                                this.validateNoteName()
                            }>Add</button>
                    </form>
   
            </section>
        )
    }
}

export default AddNote