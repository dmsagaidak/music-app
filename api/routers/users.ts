import express from "express";
import User from "../models/User";
import mongoose from "mongoose";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();
        return res.send(user);
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if(!user) {
        return res.status(400).send({error: 'User not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch){
        return res.status(400).send({error: 'Password not found'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password are correct', user});
});


export default usersRouter;