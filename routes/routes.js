import express from 'express';
import authController from '../apiController/authController.js';
import bookingsController from '../apiController/bookingsController.js';

const routes = express.Router();

     

// Auth
routes.post('/auth', authController.authentication);

// Bookings
routes.get('/bookings', bookingsController.retrieveBookings);

// Messages for bookings
routes.get('/bookings/:uuid/messages', bookingsController.getMessages);
routes.post('/bookings/:uuid/messages', bookingsController.postMessage);





export default routes;