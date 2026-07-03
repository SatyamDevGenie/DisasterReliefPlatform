import crypto from "crypto";

import RefreshToken from "../models/refreshToken.model";
import PasswordReset from "../models/passwordReset.model";
import EmailVerification from "../models/emailVerification.model";
import User from "../models/user.model";

export const registerUser =
    async (data: any) => {

        const exists =
            await User.findOne({
                email: data.email
            });

        if (exists)
            throw new Error(
                "User already exists"
            );

        const user =
            await User.create(data);

        return user;
    };

export const loginUser =
    async (
        email: string,
        password: string
    ) => {

        const user =
            await User.findOne({
                email
            });

        if (!user)
            throw new Error(
                "Invalid credentials"
            );

        const valid =
            await user.comparePassword(
                password
            );

        if (!valid)
            throw new Error(
                "Invalid credentials"
            );

        return user;
    };



export const logoutUser = async (
    refreshToken: string
) => {

    await RefreshToken.findOneAndDelete({
        token: refreshToken
    });

    return true;
};


export const saveRefreshToken = async (
    userId: string,
    token: string
) => {

    return RefreshToken.create({
        user: userId,
        token,
        expiresAt: new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        )
    });
};

export const refreshUserToken = async (
    token: string
) => {

    const exists =
        await RefreshToken.findOne({
            token
        });

    if (!exists)
        throw new Error(
            "Invalid refresh token"
        );

    return exists;
};


export const createPasswordReset = async (
    email: string
) => {

    const user =
        await User.findOne({
            email
        });

    if (!user)
        throw new Error(
            "User not found"
        );

    const token =
        crypto.randomBytes(32)
            .toString("hex");

    await PasswordReset.create({

        user: user._id,

        token,

        expiresAt:
            new Date(
                Date.now() +
                3600000
            )
    });

    return token;
};


export const resetUserPassword =
    async (
        token: string,
        password: string
    ) => {

        const reset =
            await PasswordReset
                .findOne({
                    token
                });

        if (!reset)
            throw new Error(
                "Invalid token"
            );

        const user =
            await User.findById(
                reset.user
            );

        if (!user)
            throw new Error(
                "User not found"
            );

        user.password =
            password;

        await user.save();

        await PasswordReset
            .deleteOne({
                _id: reset._id
            });

        return true;
    };


export const verifyUserEmail =
    async (
        token: string
    ) => {

        const verify =
            await EmailVerification
                .findOne({
                    token
                });

        if (!verify)
            throw new Error(
                "Invalid token"
            );

        const user =
            await User.findById(
                verify.user
            );

        if (!user)
            throw new Error(
                "User not found"
            );

        user.isVerified =
            true;

        await user.save();

        await EmailVerification
            .deleteOne({
                _id: verify._id
            });

        return true;
    };

export const changeUserPassword =
    async (
        userId: string,
        oldPassword: string,
        newPassword: string
    ) => {

        const user =
            await User.findById(
                userId
            );

        if (!user)
            throw new Error(
                "User not found"
            );

        const valid =
            await user.comparePassword(
                oldPassword
            );

        if (!valid)
            throw new Error(
                "Invalid password"
            );

        user.password =
            newPassword;

        await user.save();

        return true;
    };

export const updateUserProfile =
    async (
        userId: string,
        body: any
    ) => {

        return User
            .findByIdAndUpdate(
                userId,
                body,
                {
                    new: true
                }
            )
            .select(
                "-password"
            );
    };

export const deleteUser =
    async (
        userId: string
    ) => {

        return User
            .findByIdAndDelete(
                userId
            );
    };