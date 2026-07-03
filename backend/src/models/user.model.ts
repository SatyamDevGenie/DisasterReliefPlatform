import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { UserRole } from "../types/user.types";

export interface IUser extends Document {

    name: string;

    email: string;

    password: string;

    phone: string;

    role: UserRole;

    comparePassword(
        password: string
    ): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.VOLUNTEER
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (this: IUser) {

    if (!this.isModified("password"))
        return;

    this.password = await bcrypt.hash(
        this.password,
        10
    );

});

userSchema.methods.comparePassword =
    async function (
        password: string
    ) {

        return bcrypt.compare(
            password,
            this.password
        );
    };

export default mongoose.model<IUser>(
    "User",
    userSchema
);