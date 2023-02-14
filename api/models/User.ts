import mongoose, {Model} from "mongoose";
import {IUser} from "../types";
import bcrypt from 'bcrypt';


const SALT_WORK_FACTOR = 10;

interface IUserMethods {
    checkPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model<IUser, UserModel>('User', UserSchema);
export default User;