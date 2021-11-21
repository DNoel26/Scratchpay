/** @format */

import express from 'express';
import { getAllClinics } from '../../controllers/clinics.js';
import { asyncMiddlewareHandler } from '../../middleware/async-handler.js';
import { validateQueryParams } from '../../middleware/validate-query.js';
import { USStatesHandler } from '../../middleware/us-states.js';
const router = express.Router();

router.get(
    '/',
    validateQueryParams,
    USStatesHandler,
    asyncMiddlewareHandler(async (req, res) => await getAllClinics(req, res)),
);

export default router;
