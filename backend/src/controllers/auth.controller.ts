import { Request, Response } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    createPasswordReset,
    resetUserPassword,
    verifyUserEmail,
    changeUserPassword,
    updateUserProfile,
    deleteUser,
    saveRefreshToken
} from "../services/auth.service";

import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/generateTokens";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/
export const register = async (
    req: Request,
    res: Response
) => {

    const user = await registerUser(
        req.body
    );

    res.status(201).json({
        success: true,
        user
    });
};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
export const login = async (
    req: Request,
    res: Response
) => {

    const {
        email,
        password
    } = req.body;

    const user = await loginUser(
        email,
        password
    );

    const accessToken =
        generateAccessToken(
            user.id
        );

    const refreshToken =
        generateRefreshToken(
            user.id
        );

    await saveRefreshToken(
        user.id,
        refreshToken
    );

    res.json({
        success: true,
        accessToken,
        refreshToken,
        user
    });
};

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/
export const profile = async (
    req: any,
    res: Response
) => {

    res.json({
        success: true,
        user: req.user
    });
};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/
export const logout = async (
    req: Request,
    res: Response
) => {

    const {
        refreshToken
    } = req.body;

    await logoutUser(
        refreshToken
    );

    res.json({
        success: true,
        message: "Logged out successfully"
    });
};

/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/
export const refreshToken = async (
    req: Request,
    res: Response
) => {

    const { refreshToken } = req.body;

    const token =
        await refreshUserToken(
            refreshToken
        );

    if (!token.user) {
        throw new Error(
            "Invalid refresh token"
        );
    }

    const accessToken =
        generateAccessToken(
            token.user.toString()
        );

    res.json({
        success: true,
        accessToken
    });
};

/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/
export const forgotPassword = async (
    req: Request,
    res: Response
) => {

    const token =
        await createPasswordReset(
            req.body.email
        );

    res.json({
        success: true,
        message: "Password reset token generated",
        token
    });
};

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/
export const resetPassword = async (
    req: Request,
    res: Response
) => {

    await resetUserPassword(
        req.params.token as string,
        req.body.password
    );

    res.json({
        success: true,
        message: "Password reset successful"
    });
};

/*
|--------------------------------------------------------------------------
| Verify Email
|--------------------------------------------------------------------------
*/
export const verifyEmail = async (
    req: Request,
    res: Response
) => {

    await verifyUserEmail(
        req.params.token as string
    );

    res.json({
        success: true,
        message: "Email verified successfully"
    });
};

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/
export const changePassword = async (
    req: any,
    res: Response
) => {

    const {
        oldPassword,
        newPassword
    } = req.body;

    await changeUserPassword(
        req.user._id,
        oldPassword,
        newPassword
    );

    res.json({
        success: true,
        message: "Password changed successfully"
    });
};

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/
export const updateProfile = async (
    req: any,
    res: Response
) => {

    const user =
        await updateUserProfile(
            req.user._id,
            req.body
        );

    res.json({
        success: true,
        user
    });
};

/*
|--------------------------------------------------------------------------
| Delete Account
|--------------------------------------------------------------------------
*/
export const deleteAccount = async (
    req: any,
    res: Response
) => {

    await deleteUser(
        req.user._id
    );

    res.json({
        success: true,
        message: "Account deleted successfully"
    });
};