import jwt from "jsonwebtoken";

import User from "../models/user.model";

export const protect =
    async (
        req: any,
        res: any,
        next: any
    ) => {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith(
                "Bearer"
            )
        ) {

            token =
                req.headers.authorization
                    .split(" ")[1];
        }

        if (!token) {

            return res.status(401)
                .json({
                    message:
                        "Unauthorized"
                });
        }

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as any;

        req.user =
            await User.findById(
                decoded.id
            ).select(
                "-password"
            );

        next();
    };