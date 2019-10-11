import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/mainsidebar.css'
import StoreContext from '../context/StoreContext'

class MainSideBar extends React.Component {

    static contextType = StoreContext;

    handleAddFolder = (e) => {
        let folderName = prompt("New folder name:", "New Folder");
        if (folderName === null || folderName === '') {
            return;
        } else {
            this.context.createFolder(folderName)
        }
    }

    handleDeleteFolder = (e, id) => {
        this.context.deleteFolder(id);    
    }

    handleUpdateFolder = (e, id) => {
        let updatedFolder = prompt("Update folder name:", "Updated Folder");
        if (updatedFolder === null || updatedFolder === '') {
            return;
        } else {
            this.context.updateFolder(id, updatedFolder);
        }
    }

    render(){

    
    const folderList = this.context.folders.map(folder => {
        return(
            <li key={folder.id} className="nav-list">
                <NavLink to={`/folder/${folder.id}`} style={{ textDecoration: 'none' }}>
                  {folder.title}
                </NavLink>
                <button onClick={e => this.handleDeleteFolder(e, folder.id)}>X</button>
                <button onClick={e => this.handleUpdateFolder(e, folder.id)}>Update</button>
            </li>
        )
    })
    return (
        <div className="nav-container">
            <nav>
                {folderList}
            </nav>
            <button className="add-button" onClick={e => this.handleAddFolder(e)}>Add Folder</button>
        </div>
    )
}
}

export default MainSideBar;