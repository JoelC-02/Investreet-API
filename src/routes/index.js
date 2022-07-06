import express from 'express';
import { clientPage, addClientData, clientCurrentWorth, clientPersonalProfile, updatePersonalProfile, updateFinanceProfile, updateProfileImage, uploadClientHoldings, clientHoldings } from '../controllers';

const indexRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${originalname}`);
  },
});

const upload = multer({storage});

indexRouter.get('/registerform', clientPage);
indexRouter.get('/currentworth/:id', clientCurrentWorth);
indexRouter.get('/personalprofile/:id', clientPersonalProfile);
indexRouter.get('/clientholdings/:id', clientHoldings);
indexRouter.post('/registerform', addClientData);
indexRouter.post('/updatepersonalprofile', updatePersonalProfile);
indexRouter.post('/updateprofileimage', updateProfileImage);
indexRouter.post('/updatefinanceprofile', updateFinanceProfile);
indexRouter.post('/uploadclientholdings', upload.single("file"), uploadClientHoldings);

export default indexRouter;