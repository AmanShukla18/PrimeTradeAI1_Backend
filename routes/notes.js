const express = require('express');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/notesController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/notes
router.post('/', auth, createNote);

// GET /api/notes
router.get('/', auth, getNotes);

// GET /api/notes/:id
router.get('/:id', auth, getNoteById);

// PUT /api/notes/:id
router.put('/:id', auth, updateNote);

// DELETE /api/notes/:id
router.delete('/:id', auth, deleteNote);

module.exports = router;