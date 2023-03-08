import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";


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

export default artistsRouter;