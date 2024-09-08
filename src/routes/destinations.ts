/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import {
  getAllDestinations,
  getDestinationById,
  createNewDestination
} from "../controllers";

const router = Router();

// Get all destinations
router.get("/", getAllDestinations);

// Get destination by ID
router.get("/:id", getDestinationById);

// Create new destination
router.post("/", createNewDestination);

// Update destination by ID - to be made
// router.put("/:id");

// Delete destination by ID - to be made
// router.delete("/:id");

export { router as destinationRoutes };
