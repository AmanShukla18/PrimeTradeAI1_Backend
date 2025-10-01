const express = require('express');
const { getProfile, updateProfile, uploadProfilePicture, deleteProfilePicture } = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// GET /api/user/profile
router.get('/profile', auth, getProfile);

// PUT /api/user/profile
router.put('/profile', auth, updateProfile);

// POST /api/user/profile-picture
router.post('/profile-picture', auth, upload.single('profilePicture'), uploadProfilePicture);

// DELETE /api/user/profile-picture
router.delete('/profile-picture', auth, deleteProfilePicture);

module.exports = router;