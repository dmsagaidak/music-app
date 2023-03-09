import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import userMiddleware from "../middleware/userMiddleware";

const tracksRouter = express.Router();

tracksRouter.get('/', userMiddleware, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if(!user || user.role === 'user') {
            if(req.query.album) {
                const tracks = await Track.find({album: req.query.album, isPublished: true}).populate('album').sort({tracknumber: 1});
                return res.send(tracks);
            }else if(req.query.artist){
                const albums = await Album.find({artist: req.query.artist});
                const albumIds = albums.map(item => {return item._id});
                const tracks = await Track.find({album: {$in: albumIds}, isPublished: true}).sort({tracknumber: 1});
                return res.send(tracks);
            }else {
                const tracks = await Track.find({isPublished: true}).populate('album').sort({tracknumber: 1});
                return res.send(tracks);
            }

        }else {
            if(req.query.album) {
                const tracks = await Track.find({album: req.query.album}).populate('album').sort({tracknumber: 1});
                return res.send(tracks);
            }else if(req.query.artist){
                const albums = await Album.find({artist: req.query.artist});
                const albumIds = albums.map(item => {return item._id});
                const tracks = await Track.find({album: {$in: albumIds}}).sort({tracknumber: 1});
                return res.send(tracks);
            }else {
                const tracks = await Track.find().populate('album').sort({tracknumber: 1});
                return res.send(tracks);
            }
        }
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

tracksRouter.post('/', auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }

        const track = await Track.create({
        tracknumber: req.body.tracknumber,
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration,
        isPublished: false,
    });

        return res.send(track);
    }catch (e) {
        if(e instanceof  mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }else {
            return next(e);
        }
    }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (user.role !== 'admin'){
            res.status(403).send({message: 'Only admins can delete this  item'})
        }

        const removingTrack = await Track.findById(req.params.id);
        if(!removingTrack){
            return res.status(404).send({error: 'Track not found'});
        }else{
            await Track.deleteOne({_id: req.params.id});
            return res.send({message: 'Track was successfully removed'});
        }

    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (user.role !== 'admin'){
            res.status(403).send({message: 'Only admins can toggle items status'});
        }

        const updatingTrack = await Track.findById(req.params.id);

        if(!updatingTrack) {
            return res.status(404).send({error: 'Track not found'});
        }

        if(updatingTrack.isPublished) {
            await Track.updateOne({_id: req.params.id},
                {$set: {isPublished: false}});
        }else {
            await Track.updateOne({_id: req.params.id},
                {$set: {isPublished: true}});
        }

        const updated = await Track.findById(req.params.id);

        return res.send(updated);

    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
})

export default tracksRouter;