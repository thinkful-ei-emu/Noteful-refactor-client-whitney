import config from '../config';

const FoldersService = {

  // GET ALL FOLDERS
  getAllFolders() {
    return fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'GET',
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },

  // CREATE A FOLDER
  createFolder(folder) {
    return fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  // GET FOLDER BY ID
  getFolderById(id) {
    return fetch(`${config.API_ENDPOINT}/folders/${id}`, {
      method: 'GET',
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  // DELETE FOLDER BY ID
  deleteFolderById(id) {
    return fetch(`${config.API_ENDPOINT}/folders/${id}`, {
      method: 'DELETE',
    })
    .then(res =>
      (!res.ok)
      ? (e => Promise.reject(e))
      : ''
    )
  },
  // UPDATE FOLDER BY ID
  updateFolderById(id, updateInfo) {
    return fetch(`${config.API_ENDPOINT}/folders/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateInfo),
    })
    .then(res =>
      (!res.ok)
      ? (e => Promise.reject(e))
      : ''
    )
  }
}

export default FoldersService;