import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import Track from "../models/Track";
import userMiddleware from "../middleware/userMiddleware";


const artistsRouter = express.Router();

artistsRouter.get('/', userMiddleware, async(req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (!user || user.role === 'user') {
            const artists = await Artist.find({isPublished: true});
            return res.send(artists);
        } else {
            const artists = await Artist.find();
            return res.send(artists);
        }

    }catch (e) {
       return next (e);
    }
});

artistsRouter.get('/:id', async(req, res, next) => {
    try{
       const result = await Artist.findById(req.params.id);

       if(!result){
           return res.status(400).send('No such artist');
       }

       return res.send(result);
    }catch (e) {
        return next(e);
    }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async(req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }


        const artist = await Artist.create({
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info,
        isPublished: false,
    });

        return res.send(artist);
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }else{
            return next(e);
        }
    }
});

artistsRouter.delete('/:id', auth, permit('admin'), async  (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (user.role !== 'admin'){
            res.status(403).send({message: 'Only admins can delete this  item'})
        }

        const removingArtist = await Artist.findById(req.params.id);
        const currentAlbums = await Album.find({artist: req.params.id});
        const albumIds = currentAlbums.map(album => {
            return album._id
        });
        const currentTracks = await Track.find({album: {$in: albumIds}});

        if(!removingArtist) {
            return res.status(404).send({message: "Error. Artist not found"});
        }else if (currentTracks.length || currentAlbums.length) {
            return res.status(400).send({message: 'Artists having albums and tracks cannot be removed'});
        }else {
            await Artist.deleteOne({_id: req.params.id});
            return res.send({message: 'Artist was successfully removed'});
        }
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }

})

export default artistsRouter;