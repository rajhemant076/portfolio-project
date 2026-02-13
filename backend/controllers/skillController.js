const Skill = require('../models/Skill');

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: skills 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Create skill (Admin only)
exports.createSkill = async (req, res) => {
  try {
    const { category, skills } = req.body;

    const skill = new Skill({
      category,
      skills
    });

    await skill.save();

    res.status(201).json({ 
      success: true, 
      message: 'Skill created successfully',
      data: skill 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Update skill (Admin only)
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, skills } = req.body;

    const skill = await Skill.findByIdAndUpdate(
      id,
      { category, skills },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ 
        success: false, 
        message: 'Skill not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Skill updated successfully',
      data: skill 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Delete skill (Admin only)
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ 
        success: false, 
        message: 'Skill not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Skill deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};