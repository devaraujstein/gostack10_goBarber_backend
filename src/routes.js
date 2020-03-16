import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentsController from './app/controllers/AppointmentsController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/avaible', AvailableController.index);

routes.get('/appointments', AppointmentsController.index);
routes.post('/appointments', AppointmentsController.store);
routes.delete('/appointments/:id', AppointmentsController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/schedule', ScheduleController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
