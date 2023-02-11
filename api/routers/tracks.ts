import express from "express";
import mongoose from "mongoose";
import Track from "../models/Tracks";
import {TrackMutation} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try{
        if(req.query.album) {
            const tracks = await Track.find({album: req.query.album}).populate('album');
            return res.send(tracks);
        }

        const tracks = await Track.find().populate('album');
        return res.send(tracks)

    }catch (e) {
        return next(e);
    }
});

tracksRouter.get('/:id', async(req, res, next) => {
    try {
        const result = await Track.findById(req.params.id).populate('album');

        if(!result){
            return res.status(400).send('No such track');
        }

        return res.send(result);
    }catch (e) {
        return  next(e);
    }
})

tracksRouter.post('/', async (req, res, next) => {
    const trackData: TrackMutation = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration,
    };

    const track = new Track(trackData);

    try{
        await track.save();
        return res.send(track);
    }catch (e) {
        if(e instanceof  mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }else {
            return next(e);
        }
    }
});

export default tracksRouter;