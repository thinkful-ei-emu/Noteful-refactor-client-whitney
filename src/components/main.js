import React from 'react';
import NoteList from './notelist';
import Context from '../context/StoreContext'
import './styles/main.css'

class Main extends React.Component {

    static contextType = Context;

    state = {
        add: false,
        noteTitle: '',
        noteContent: '',
        noteFolder: null,
    }

    toggleAdd = () => {
        this.setState({
            add: !this.state.add
        })
    }

    handleNoteSubmit = (e) => {
        e.preventDefault();
        let newNote = {
            title: this.state.noteTitle,
            content: this.state.noteContent,
            folder_id: this.state.noteFolder
        }
        console.log(newNote)
        this.context.createNote(newNote)
        this.setState({
            noteTitle: '',
            noteContent: '',
            noteFolder: null,
            add: false,
        })
    }

    render() {
        let radioButtons = this.context.folders.map(folder => <div key={folder.id}><input type="radio" name="radio" value={folder.id} onChange={e => this.setState({noteFolder: e.target.value})}/><label>{folder.title}</label></div>)
    return(
        <div className="main-container">
            <NoteList match={this.props.match}/>
            <div className={this.state.add ? "add" : "hidden"}>
                <form onSubmit={e => this.handleNoteSubmit(e)}>
                    <div>
                        <label>Note Title:</label>
                        <div>
                        <input value={this.state.noteTitle} onChange={e => this.setState({noteTitle: e.target.value})} required/>
                        </div>
                    </div>
                    <div>
                        <label>Note Content:</label>
                        <div>
                        <textarea value={this.state.noteContent} onChange={e => this.setState({noteContent: e.target.value})}required/>
                        </div>
                    </div>
                    <label>Folder</label>
                    {radioButtons}
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="button-container">
             <button className="add-note" onClick={this.toggleAdd}>Add Note</button>
             </div>
        </div>
    )
}
}

export default Main