import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from "./routers/artists";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/artists', artistsRouter);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log('The server runs on ' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

