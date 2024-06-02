const express = require('express')
const StudentRoutes = require('./src/student/routes')
const PrivateStudent = require('./src/private/routes')
const GeneralRoutes = require('./src/common/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express();

// Server's port
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

// API calls
app.use('/api/v1', GeneralRoutes);


app.use('/api/v1/student', StudentRoutes);


app.use('/pvt_api', PrivateStudent); // Debug route!

// Server running
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});