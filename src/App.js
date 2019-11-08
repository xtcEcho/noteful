import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import STORE from './dummy-store'
import MainSide from './MainSide/MainSide'
import MainMain from './MainMain/MainMain'
import FolderSide from './FolderSide/FolderSide'
import FolderMain from './FolderMain/FolderMain'
import NoteSide from "./NoteSide/NoteSide"
import NoteMain from './NoteMain/NoteMain'
import './App.css';

const {folders, notes} = STORE

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      folders,
      notes
    }
  }
  render(){
    // console.log(this.state.notes)
    return(
      <div className="App">
        <header>
          <Link to={'/'} className='header'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <main>
          <div className="side">
            <Route 
              exact path='/'
              render={() =>
              <MainSide 
              folders={this.state.folders}
              />} 
            />
            <Route 
              path="/folder/:folderId"
              render={() =>
              <FolderSide 
              folders={this.state.folders}/> }
            />
            <Route 
              path="/note/:noteId"
              render={({history, match}) =>
              <NoteSide 
                note={this.state.notes.find(note =>
                  note.id === match.params.noteId
                )}
                folders={this.state.folders}
                onBack={() => history.goBack()}
              /> }
            />
          </div>
            <div className="main">
              <Route 
                exact path='/'
                render={() =>
                <MainMain
                notes={this.state.notes} />} 
              />
              <Route 
                path='/folder/:folderId'
                render={({match}) => {
                  console.log(match)
                  return <FolderMain 
                    notes={this.state.notes.filter(note => 
                    note.folderId === match.params.folderId
                    )}/>}
                } 
              />
              <Route 
                path="/note/:noteId"
                render={({match}) =>
                <NoteMain 
                note={this.state.notes.find(note =>
                  note.id === match.params.noteId
                )}/> }
              />
            </div>

        </main>
      </div>
    )
  }
}

export default App;
