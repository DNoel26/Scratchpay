/** @format */

import express from 'express';
import dotenv from 'dotenv';
import clinicsRoutes from './routes/api/clinics.js';
dotenv.config();
const app = express();

app.get('/', (req, res) => res.send('Hello Scratchpay'));
app.use(`/api/v1/clinics`, clinicsRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.end;
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
