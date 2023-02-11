import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async(req, res, next) => {
    try{
        const artists = await Artist.find();
        return res.send(artists);
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

artistsRouter.post('/', imagesUpload.single('image'), async(req, res, next) => {
    const artistData: ArtistMutation = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info,
    };

    const artist = new Artist(artistData);

    try {
        await artist.save();
        return res.send(artist);
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }else{
            return next(e);
        }
    }
})

export default artistsRouter;