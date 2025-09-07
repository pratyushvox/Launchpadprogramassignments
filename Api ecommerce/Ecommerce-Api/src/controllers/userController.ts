import { Request, Response } from 'express';
import User from '../models/User';

// Create a New User
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: savedUser
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

//   User Search and Retrieval
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const {
      country,
      minFollowers,
      interest,
      profileTheme,
      subscriptionTier,
      page = 1,
      limit = 10
    } = req.query;

    
    const filter: any = {};

    if (country) {
      filter.country = country;
    }

    if (minFollowers) {
      filter.followers = { $gte: Number(minFollowers) };
    }

    if (interest) {
      filter.interests = { $in: [interest] };
    }

    if (profileTheme) {
      filter['profile.theme'] = profileTheme;
    }

    if (subscriptionTier) {
      filter['subscription.tier'] = subscriptionTier;
    }

    // Calculate pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get users with filters and pagination
    const users = await User.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limitNum);

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully!',
      data: users,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalUsers,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
};

//  Get a Single User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User found successfully!',
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error.message
    });
  }
};

//  Update User Profile
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;


    delete updateData.username;
    delete updateData.email;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

//  Delete a User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: deletedUser
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};