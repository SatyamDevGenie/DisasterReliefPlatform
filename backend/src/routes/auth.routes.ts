import express
    from "express";

import {
    register,
    login,
    profile,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
    changePassword,
    updateProfile,
    deleteAccount
}
    from "../controllers/auth.controller";

import {
    protect
}
    from "../middleware/auth.middleware";

const router =
    express.Router();

router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);

router.get(
    "/profile",
    protect,
    profile
);

router.post("/logout", logout);

router.post(
    "/refresh-token",
    refreshToken
);

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);

router.post(
    "/verify-email/:token",
    verifyEmail
);

router.patch(
    "/change-password",
    protect,
    changePassword
);

router.patch(
    "/profile",
    protect,
    updateProfile
);

router.delete(
    "/account",
    protect,
    deleteAccount
);

export default router;