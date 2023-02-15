import express from "express";
import mongoose, {now} from "mongoose";
import {TrackHistoryMutation} from "../types";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    const userId = user._id.toString();

    try{
        const trackHistoryData: TrackHistoryMutation = {
            user: userId,
            track: req.body.track,
            datetime: now().toISOString(),
        }

        const trackHistory = new TrackHistory(trackHistoryData);

        await trackHistory.save();
        return res.send(trackHistory);
    }catch (e) {
        if(e instanceof  mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }else {
            return next(e);
        }
    }

})

export default trackHistoryRouter;