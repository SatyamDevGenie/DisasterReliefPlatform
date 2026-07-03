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