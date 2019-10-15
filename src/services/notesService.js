import config from '../config';

const NotesService = {
  // GET ALL NOTES
  getAllNotes() {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'GET',
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },

  // CREATE A NOTE
  createNote(note) {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  // GET NOTE BY ID
  getNoteById(id) {
    return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: 'GET',
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  // DELETE NOTE BY ID
  deleteNoteById(id) {
    return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: 'DELETE',
    })
    .then(res =>
      (!res.ok)
      ? (e => Promise.reject(e))
      : ''
    )
  },
  // UPDATE NOTE BY ID
  updateNoteById(id, updateInfo) {
    return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
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

export default NotesService;