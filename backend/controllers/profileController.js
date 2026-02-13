const Profile = require('../models/Profile');

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      // Create default profile if none exists
      profile = new Profile({
        name: 'Your Name',
        role: 'Full Stack Developer',
        about: 'Add your bio here',
        resumeLink: '',
        profileImage: '',
        socials: {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: ''
        }
      });
      await profile.save();
    }

    res.json({ 
      success: true, 
      data: profile 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Update Profile (Admin only)
exports.updateProfile = async (req, res) => {
  try {
    const { name, role, about, resumeLink, profileImage, socials } = req.body;

    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile(req.body);
    } else {
      profile.name = name || profile.name;
      profile.role = role || profile.role;
      profile.about = about || profile.about;
      profile.resumeLink = resumeLink !== undefined ? resumeLink : profile.resumeLink;
      profile.profileImage = profileImage !== undefined ? profileImage : profile.profileImage;
      
      if (socials) {
        profile.socials = {
          github: socials.github !== undefined ? socials.github : profile.socials.github,
          linkedin: socials.linkedin !== undefined ? socials.linkedin : profile.socials.linkedin,
          twitter: socials.twitter !== undefined ? socials.twitter : profile.socials.twitter,
          instagram: socials.instagram !== undefined ? socials.instagram : profile.socials.instagram
        };
      }
      
      profile.updatedAt = Date.now();
    }

    await profile.save();

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: profile 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};