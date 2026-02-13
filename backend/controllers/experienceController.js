const Experience = require('../models/Experience');

// Get all experience
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: experience 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Create experience (Admin only)
exports.createExperience = async (req, res) => {
  try {
    const { company, role, duration, points } = req.body;

    const experience = new Experience({
      company,
      role,
      duration,
      points
    });

    await experience.save();

    res.status(201).json({ 
      success: true, 
      message: 'Experience created successfully',
      data: experience 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Update experience (Admin only)
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, duration, points } = req.body;

    const experience = await Experience.findByIdAndUpdate(
      id,
      { company, role, duration, points },
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Experience updated successfully',
      data: experience 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Delete experience (Admin only)
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Experience deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};