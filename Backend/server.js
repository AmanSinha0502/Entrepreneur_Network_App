require('dotenv').config();
const cors = require("cors")
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router")
// const contactRoute = require("./router/contact-router")
// const serviceRoute = require("./router/service-router")
const connectDb = require("./utils/db");
// const errorMiddleware = require('./middlewares/error-middleware');
// const origin = process.env.origin;

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Allow credentials (if needed)
}));

app.use("/api/auth", authRoute);
// app.use("/api/form", contactRoute);
// app.use("/api/data", serviceRoute)

// app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
    
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    })

})