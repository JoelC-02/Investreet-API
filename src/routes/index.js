import express from 'express';
import { clientPage, addClientData, clientCurrentWorth, clientPersonalProfile, updatePersonalProfile, updateFinanceProfile, updateProfileImage } from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/registerform', clientPage);
indexRouter.get('/currentworth/:id', clientCurrentWorth);
indexRouter.get('/personalprofile/:id', clientPersonalProfile);
indexRouter.post('/registerform', addClientData);
indexRouter.post('/updatepersonalprofile', updatePersonalProfile);
indexRouter.post('/updateprofileimage', updateProfileImage);
indexRouter.post('/updatefinanceprofile', updateFinanceProfile);

export default indexRouter;