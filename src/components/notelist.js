import React from 'react';
import {Link} from 'react-router-dom';
import './styles/notelist.css'
import StoreContext from '../context/StoreContext'


class NoteList extends React.Component {

    static contextType = StoreContext;

    render(){

    const filteredNoteList = this.context.notes
        .filter(note => `/folder/${note.folder_id}` === this.props.match.url)
        .map(note => {
            const date = new Date(note.date_modified)
            const convertedDate = date.toDateString()
            return (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                    <h2>{note.title}</h2>
                    </Link>
                    <p>Date Modified On: {convertedDate}</p>
                    <button type="button" className="delete-button" onClick={()=>this.context.deleteNote(note.id)}>Delete Note</button>
                </li>
            )
        })

    const noteList = this.context.notes.map(note => {
        const date = new Date(note.date_modified)
        const convertedDate = date.toDateString()
        return (
            <li key={note.id}>
                <Link to={`/note/${note.id}`}>
                <h2>{note.title}</h2>
                </Link>
                <p>Date Modified On: {convertedDate}</p>
                <button type="button" className="delete-button" onClick={() => this.context.deleteNote(note.id)}>Delete Note</button>
            </li>
        )
    })

    if (this.props.match.url === '/') {
        return (
            <div className="note-list">
                {noteList}
            </div>
        )
    } else return (
        <div className="note-list">
            {filteredNoteList}
        </div>
    )

}
}

export default NoteList;