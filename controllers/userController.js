const User = require('../models/User');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Validate input
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).optional(),
      email: Joi.string().email().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) {
      // Check if email already exists
      const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      updateData.email = email;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // For Vercel deployment, we'll store the image as base64
    // In production, you should use cloud storage like Cloudinary or AWS S3
    const imageBuffer = req.file.buffer;
    const base64Image = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;

    // Update user with new profile picture (base64)
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: base64Image },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile picture uploaded successfully',
      user,
      profilePicture: base64Image
    });
  } catch (error) {
    console.error('Profile picture upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user.profilePicture) {
      // Update user to remove profile picture
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { profilePicture: null },
        { new: true, runValidators: true }
      ).select('-password');

      res.json({
        message: 'Profile picture deleted successfully',
        user: updatedUser
      });
    } else {
      res.status(400).json({ message: 'No profile picture to delete' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  deleteProfilePicture
};