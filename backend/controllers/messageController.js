const Message = require('../models/Message');

// Get all messages (Admin only)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: messages 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Create message (Public)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: newMessage 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Delete message (Admin only)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};