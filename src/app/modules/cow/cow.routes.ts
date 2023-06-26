import express from 'express';
import { CowController } from './cow.controller';

const router = express.Router();

router.get('/:id', CowController.getSinglCow);
router.get('/', CowController.getAllCows);
router.post('/', CowController.createCow);
router.patch('/:id', CowController.updateCow);
router.delete('/:id', CowController.deleteCow);

export const CowRoutes = router;
