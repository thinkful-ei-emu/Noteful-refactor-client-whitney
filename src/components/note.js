
import React from "react";
import "./styles/note.css";
import StoreContext from "../context/StoreContext";

class Note extends React.Component {
  static contextType = StoreContext;

  state = {
    update: false,
    titleUpdate: '',
    contentUpdate: '',
  }

  updateNote = (e, id) => {
    this.setState({
      update: !this.state.update
    })
  }

  submitUpdates = (e, id) => {
    let updatedTitle = this.state.titleUpdate ? this.state.titleUpdate !== '' ? this.state.titleUpdate : null : null;
    let updatedContent = this.state.contentUpdate ? this.state.contentUpdate : null;
    let updatedInfo;
    if (updatedTitle && updatedContent) {
      updatedInfo = {
        title: updatedTitle,
        content: updatedContent,
      }
    } else
    if (updatedTitle && !updatedContent) {
      updatedInfo = {
        title: updatedTitle
      }
    } else 
    if (!updatedTitle && updatedContent) {
      updatedInfo = {
        content: updatedContent
      }
    } else {
      return;
    }
    this.context.updateNote(id, updatedInfo)
    this.setState({
      titleUpdate: '',
      contentUpdate: '',
      update: false,
    })
  }

  render() {
    const note = this.context.notes.find(
      note => `/note/${note.id}` === this.props.match.url
    );

    if (!note) {
      return "page not found";
    }

    const date = new Date(note.date_modified);
    const convertedDate = date.toDateString();


    return (
      <div key={note.id}>
        <div className="button-folder-container">
          <button
            className="go-back"
            onClick={() => this.props.history.goBack()}
          >
            Go Back
          </button>
        </div>

        <div className="expanded-note">
          <h2 className="note-name">{note.title}</h2>
          <input type="text" value={this.state.titleUpdate} className={this.state.update ? "update" : "hidden"} onChange={e=>this.setState({titleUpdate: e.target.value})}/>
          <p>Date Modified On: {convertedDate}</p>
          <p>{note.content}</p>
          <div>
            <textarea value={this.state.contentUpdate} className={this.state.update ? "update" : "hidden"} onChange={e=>this.setState({contentUpdate: e.target.value})}/>
          </div>
          <button type="button" onClick={() => this.context.deleteNote(note.id)}>
            Delete Note
          </button>
          <button onClick={e => this.updateNote(e, note.id)}>{this.state.update ? "Cancel" : "Update Note"} </button>
          <button onClick={e => this.submitUpdates(e, note.id)} className={this.state.update ? "update" : "hidden"}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Note;