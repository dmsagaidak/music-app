import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try{
        if(req.query.album) {
            const tracks = await Track.find({album: req.query.album}).populate('album').sort({tracknumber: 1});
            return res.send(tracks);
        }

        if(req.query.artist){
            const albums = await Album.find({artist: req.query.artist});
            const albumIds = albums.map(item => {return item._id});
            const tracks = await Track.find({album: {$in: albumIds}}).sort({tracknumber: 1});
            return res.send(tracks);
        }

        const tracks = await Track.find().populate('album').sort({tracknumber: 1});
        return res.send(tracks);

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
})

export default tracksRouter;