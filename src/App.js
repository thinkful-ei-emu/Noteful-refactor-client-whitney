import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Main from "./components/main";
import MainSideBar from "./components/mainsidebar";
import Header from "./components/header";
import Note from "./components/note";
import StoreContext from "./context/StoreContext";
import {withRouter} from 'react-router-dom';
import FoldersService from './services/foldersService';
import NotesService from './services/notesService';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    note: null,
    folder: null,
  };

  componentDidMount() {
    //fetch request
    FoldersService.getAllFolders()
      .then(resJson => {
        this.setState({
          folders: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });

    NotesService.getAllNotes()
      .then(resJson => {
        this.setState({
          notes: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleNoteDelete = (noteId) => {
    NotesService.deleteNoteById(noteId)
      .catch(error => {
        console.log(error)
      })  
      let filterDeletedNotes = this.state.notes.filter(note => note.id !== noteId);
        this.setState({
          notes: filterDeletedNotes
        })
  }

  handleFolderDelete = (id) => {
    FoldersService.deleteFolderById(id)
    .catch(error => {
      console.log(error)
    })
    
    let filterDeletedFolders = this.state.folders.filter(folder => folder.id !== id);
      this.setState({
        folders: filterDeletedFolders
      })
  }

  handleCreateNote = (newNote) => {
    NotesService.createNote(newNote)
    .then(res => {
      this.setState({
        notes: [...this.state.notes, res]
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleCreateFolder = (newFolder) => {
    let formattedFolder = {
      title: newFolder
    }
    FoldersService.createFolder(formattedFolder)
    .then(res => {
      this.setState({
        folders: [...this.state.folders, res]
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleUpdateNote = (id, updatedInfo) => {
    NotesService.updateNoteById(id, updatedInfo)
    .catch(error => {
      console.log(error)
    })
    let note = this.state.notes.filter(note => note.id === id);
    let updatedNote = {
      ...note[0],
      ...updatedInfo
    }
    console.log(updatedNote)

    let notes = this.state.notes.filter(note => note.id !== id);
    this.setState({
      notes: [...notes, updatedNote]
    })
    
  }

  handleUpdateFolder = (id, updatedInfo) => {
    let formatFolder = {
      title: updatedInfo
    }
    FoldersService.updateFolderById(id, formatFolder)
    .catch(error => {
      console.log(error)
    })
    let folder = this.state.folders.filter(folder => folder.id === id);
    let updatedFolder = {
      ...folder[0],
      ...formatFolder
    }
    console.log(updatedFolder)

    let folders = this.state.folders.filter(folder => folder.id !== id);
    this.setState({
      folders: [...folders, updatedFolder]
    })

  }

  handleGetNoteById = (id) => {
    NotesService.getNoteById(id)
    .then(res => {
      this.setState({
        note: res
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleGetFolderById = (id) => {
    FoldersService.getFolderById(id)
    .then(res => {
      this.setState({
        folder: res
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <StoreContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          folder: this.state.folder,
          note: this.state.note,
          deleteNote: this.handleNoteDelete,
          deleteFolder: this.handleFolderDelete,
          getFolder: this.handleGetFolderById,
          getNote: this.handleGetNoteById,
          updateFolder: this.handleUpdateFolder,
          updateNote: this.handleUpdateNote,
          createNote: this.handleCreateNote,
          createFolder: this.handleCreateFolder,
        }}
      >
        <div className="App">
          <Header />
          <Route exact path="/" component={MainSideBar} />
          <Route
            exact
            path="/"
            component={Main}
          />
          <Route
            exact
            path="/folder/:folderId"
            render={props => (
              <>
                <MainSideBar match={props.match} />
                <Main match={props.match} />
              </>
            )}
          />

          <Route
            exact
            path="/note/:noteId"
            component={Note}
          />
        </div>
      </StoreContext.Provider>
    );
  }
}

export default withRouter(App);