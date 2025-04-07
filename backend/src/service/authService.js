import User from "../schema/userSchema.js";
import { generateToken } from "../utils/authUtils.js";
import { createError } from "../utils/errors.js";

export const signupService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw createError('Email already in use', 400);
    }

    const user = await User.create(userData);
    const token = generateToken(user._id);

    // Remove password from output
    user.password = undefined;

    return { user, token };
}

export const loginService = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.comparePassword(password))) {
        throw createError('Invalid email or password', 401);
    }

    const token = generateToken(user._id);
    user.password = undefined;

    return { user, token };
}