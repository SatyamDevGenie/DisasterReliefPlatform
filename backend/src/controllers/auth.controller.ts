import { Request, Response }
    from "express";

import {
    registerUser,
    loginUser
} from "../services/auth.service";

import {
    generateAccessToken,
    generateRefreshToken
}
    from "../utils/generateTokens";

export const register =
    async (
        req: Request,
        res: Response
    ) => {

        const user =
            await registerUser(
                req.body
            );

        res.status(201).json({
            success: true,
            user
        });
    };

export const login =
    async (
        req: Request,
        res: Response
    ) => {

        const {
            email,
            password
        } = req.body;

        const user =
            await loginUser(
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

        res.json({
            success: true,

            accessToken,

            refreshToken,

            user
        });
    };

export const profile =
    async (
        req: any,
        res: Response
    ) => {

        res.json({
            success: true,
            user: req.user
        });
    };