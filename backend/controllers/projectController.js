const Project = require('../models/Project');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: projects 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Create project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink, imageUrl } = req.body;

    const project = new Project({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      imageUrl
    });

    await project.save();

    res.status(201).json({ 
      success: true, 
      message: 'Project created successfully',
      data: project 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Update project (Admin only)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, githubLink, liveLink, imageUrl } = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { title, description, techStack, githubLink, liveLink, imageUrl },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Project updated successfully',
      data: project 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Delete project (Admin only)
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Project deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};