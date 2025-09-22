const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const patientRoutes = require('./src/routes/patient.routes');
const dentistRoutes = require('./src/routes/dentist.routes');
const appointmentRoutes = require('./src/routes/appointment.routes');

dotenv.config();
require('dotenv').config();

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Dental Clinic API. Use the /api/... routes to access the services.'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});