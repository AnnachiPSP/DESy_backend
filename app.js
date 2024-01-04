const express = require('express');
const ApplicationRoutes = require('./src/application/routes');
const StudentRoutes = require('./src/student/routes');
const privateStudent = require('./src/private/routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');


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
app.get('/api', (req, res) => {
    res.send("DESy Backend");
});

app.use('/api/v1/application', ApplicationRoutes);
app.use('/api/v1/student', StudentRoutes);


app.use('/pvt_api', privateStudent); // Debug route!

// Server running
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});