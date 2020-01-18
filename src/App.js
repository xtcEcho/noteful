import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import MainSide from './MainSide/MainSide'
import MainMain from './MainMain/MainMain'
import FolderSide from './FolderSide/FolderSide'
import FolderMain from './FolderMain/FolderMain'
import NoteSide from "./NoteSide/NoteSide"
import NoteMain from './NoteMain/NoteMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import PostError from './PostError/PostError'
import config from './config'
import NotefulContext from './NotefulContext'
import './App.css';

// const {folders, notes} = STORE

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      folders: [],
      notes: [],
      folderError: null,
      noteError: null,
      folderLocation:'',
    }
  }

  setFolders = folders => {
    // console.log(folders)
    this.setState({
      folders,
      error: null,
    })
    console.log(this.state.folders)
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null,
    })
    console.log(this.state.notes)
  }

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }
  addNote = note => {
    this.setState({
      notes:[...this.state.notes, note]
    })
  }

  updatePushLocation = path =>{
    console.log(path)
    this.setState({
      folderLocation: path,
    })
  }

  deleteNoteOutside = noteId =>{
    // console.log(`${config.NOTE_ENDPOINT}/${noteId}`)
    fetch(`${config.API_NOTE_ENDPOINT}/${noteId}`, {
      method: 'DELETE',
      headers:{
        'content-type': 'application/json',
      }
    })
    .then(res =>{
      if (!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    }).catch(error => this.setState({error}))
    .then(() => {
      this.fetchAllNotes()
    })
  }

  deleteNoteInside = () => {
    this.fetchAllNotes()
  }

  fetchAllFolders = () => {
    fetch(config.API_FOLDER_ENDPOINT,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }).then(res => {
      if (!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    }).then(resJson => 
      this.setFolders(resJson)
    )
    .catch(folderError => this.setState({folderError}))
  }
  fetchAllNotes = () => {
    fetch(config.API_NOTE_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }).then(res => {
      if (!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    }).then(resJson => 
      this.setNotes(resJson)
    )
    .catch(noteError => this.setState({noteError}))
  }
  componentDidMount(){
    this.fetchAllFolders()
    this.fetchAllNotes()
  }

  render(){
    // console.log(this.state.notes)
    const contextValue = {
      folders: this.state.folders,
      notes:this.state.notes,
      folderLocation: this.state.folderLocation,
      deleteNoteOutside: this.deleteNoteOutside,
      deleteNoteInside: this.deleteNoteInside,
      addFolder: this.addFolder,
      addNote: this.addNote,
      updatePushLocation: this.updatePushLocation,
      fetchAllFolders: this.fetchAllFolders,
      fetchAllNotes: this.fetchAllNotes,
    }
    return(
      <div className="App">
        <header>
          <Link to={'/'} className='header'>
            <h1>Noteful</h1>
          </Link>
        </header>

        <NotefulContext.Provider value={contextValue}>
        <main>
          <div className="side">
            <PostError>
              <Route 
                exact path={["/", "/add-folder","/add-note"]}
                component={MainSide}
              />
            </PostError>
            <PostError>
              <Route 
                path="/folder/:folderId"
                component={FolderSide}
              />
            </PostError>
            <PostError>
              <Route 
                path="/note/:noteId"
                component={NoteSide}
              />
            </PostError>
          </div>
            <div className="main">
              <PostError>
                <Route 
                  exact path='/'
                  component={MainMain}
                />
              </PostError>
              <PostError>
              <Route 
                path='/folder/:folderId'
                component={FolderMain}
              />
              </PostError>
              <PostError>
                <Route 
                  path="/note/:noteId"
                  component={NoteMain}
                />
              </PostError>
              <PostError>
                <Route
                  path='/add-folder'
                  component={AddFolder}
                />
              </PostError>
              <PostError>
                <Route 
                  path='/add-note'
                  component={AddNote}
                />
              </PostError>
            </div>

        </main>
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App;
