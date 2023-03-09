import express from "express";
import Album from "../models/Album";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Track from "../models/Track";
import userMiddleware from "../middleware/userMiddleware";



const albumsRouter = express.Router();

albumsRouter.get('/', userMiddleware, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if(!user || user.role === 'user') {
            if(req.query.artist){
                const albums = await Album.find({artist: req.query.artist, isPublished: true}).populate('artist').sort({year: -1});
                return res.send(albums);
            }

            const albums = await Album.find({isPublished: true}).populate('artist').sort({year: -1});
            return res.send(albums);
        }else {
            if(req.query.artist){
                const albums = await Album.find({artist: req.query.artist}).populate('artist').sort({year: -1});
                return res.send(albums);
            }

            const albums = await Album.find().populate('artist').sort({year: -1});
            return res.send(albums);
        }
    }catch (e) {
        return next(e);
    }
});

albumsRouter.get('/:id', async(req, res, next) => {
    try{
        const result = await Album.findById(req.params.id).populate('artist');

        if(!result){
           return  res.status(400).send('No such album');
        }

        return res.send(result);
    }catch (e) {
      return next(e);
    }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).send({error: 'Wrong token!'});
        }


        const album = await Album.create({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        image: req.file ? req.file.filename : null,
        isPublished: false,
    });

        return res.send(album);
    }catch (e) {
        if(e instanceof  mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }else {
            return next(e);
        }
    }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (user.role !== 'admin'){
            res.status(403).send({message: 'Only admins can delete this  item'})
        }

        const removingAlbum = await Album.findById(req.params.id);
        const currentTracks = await Track.find({album: req.params.id});

        if(!removingAlbum){
            return res.status(404).send({message: 'Error, album not found'})
        }else if(currentTracks.length){
            return res.status(400).send({message: 'Error. Albums having tracks cannot be removed'});
        }else {
            await Album.deleteOne({_id: req.params.id});
            return res.send({message: 'Album was successfully removed'});
        }
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (user.role !== 'admin'){
            res.status(403).send({message: 'Only admins can toggle items status'});
        }

        const updatingAlbum = await Album.findById(req.params.id);

        if(!updatingAlbum) {
            res.status(404).send({error: 'Album not found'});
        }

        if(updatingAlbum?.isPublished === false) {
            await Album.updateOne({_id: req.params.id},
                {$set: {isPublished: true}});
        }else{
            await Album.updateOne({_id: req.params.id},
                {$set: {isPublished: false}});
        }


        const updated = await Album.findById(req.params.id);
        return res.send(updated);
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
})

export default albumsRouter;