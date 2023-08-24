const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require('./Db');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const resetRoutes = require('./routes/resetRoutes');
const saleRoutes = require('./routes/saleRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDb();

// system middlewares

mongoose.connection.on('connected', ()=>{
    console.log('Mongo is back')
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongo is disconnected')
})

app.use("*",cors({
    origin:true,
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser())

app.use('/api/users', userRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reset', resetRoutes);

app.use((err, req, res, next)=>{
    const errorStatus = err.status ||500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack
    });
})

const PORT = 5555 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})