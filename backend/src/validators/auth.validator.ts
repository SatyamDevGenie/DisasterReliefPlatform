import { z } from "zod";
import { UserRole } from "../types/user.types";

/**
 * Register User Validation
 */
export const registerSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(50, "Name cannot exceed 50 characters"),

        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase(),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password cannot exceed 32 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])/,
                "Password must contain uppercase, lowercase, number and special character"
            ),

        phone: z
            .string()
            .trim()
            .regex(
                /^[6-9]\d{9}$/,
                "Phone number must be a valid 10-digit Indian mobile number"
            ),

        role: z.nativeEnum(UserRole)
    })
});

/**
 * Login Validation
 */
export const loginSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase(),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
    })
});

/**
 * Forgot Password Validation
 */
export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase()
    })
});

/**
 * Reset Password Validation
 */
export const resetPasswordSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Reset token is required")
    }),

    body: z.object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(32)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])/,
                "Password must contain uppercase, lowercase, number and special character"
            )
    })
});

/**
 * Verify Email Validation
 */
export const verifyEmailSchema = z.object({
    params: z.object({
        token: z.string().min(1, "Verification token is required")
    })
});

/**
 * Change Password Validation
 */
export const changePasswordSchema = z.object({
    body: z.object({
        oldPassword: z
            .string()
            .min(8, "Old password is required"),

        newPassword: z
            .string()
            .min(8)
            .max(32)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])/,
                "Password must contain uppercase, lowercase, number and special character"
            )
    })
});

/**
 * Update Profile Validation
 */
export const updateProfileSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(3)
            .max(50)
            .optional(),

        phone: z
            .string()
            .regex(
                /^[6-9]\d{9}$/,
                "Phone number must be a valid 10-digit Indian mobile number"
            )
            .optional()
    })
});

/**
 * Refresh Token Validation
 */
export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z
            .string()
            .min(1, "Refresh token is required")
    })
});