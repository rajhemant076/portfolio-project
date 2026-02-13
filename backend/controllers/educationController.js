const Education = require('../models/Education');

// Get all education
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: education 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Create education (Admin only)
exports.createEducation = async (req, res) => {
  try {
    const { college, degree, duration, description } = req.body;

    const education = new Education({
      college,
      degree,
      duration,
      description
    });

    await education.save();

    res.status(201).json({ 
      success: true, 
      message: 'Education created successfully',
      data: education 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Update education (Admin only)
exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { college, degree, duration, description } = req.body;

    const education = await Education.findByIdAndUpdate(
      id,
      { college, degree, duration, description },
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({ 
        success: false, 
        message: 'Education not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Education updated successfully',
      data: education 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Delete education (Admin only)
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({ 
        success: false, 
        message: 'Education not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Education deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};