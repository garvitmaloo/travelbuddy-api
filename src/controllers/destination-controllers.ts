import type { Request, Response } from "express";

import sequelize from "../config/db";
import { logger } from "../utils/logger";
import type { DestinationsDTO } from "../../types";

const getAllDestinations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await sequelize.query("SELECT * FROM travel_destinations");
    const data = response[0];
    res.json({
      error: null,
      result: data as DestinationsDTO[]
    });
  } catch (err) {
    const errorMsg = (err as Error).message;
    logger.error(`Failed to fetch all destinations - ${errorMsg}`);
    res.json({
      error: {
        statusCode: 404,
        message: `Failed to fetch all destinations - ${errorMsg}`
      },
      result: null
    });
  }
};

const getDestinationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const idNumber = parseInt(id, 10);
    const response = await sequelize.query(
      "SELECT * FROM travel_destinations WHERE id = ?",
      {
        replacements: [idNumber]
      }
    );

    // Assuming there's only one result or none
    const data = response[0] as unknown as DestinationsDTO | undefined;

    if (data !== undefined) {
      res.json({
        error: null,
        result: data
      });
    } else {
      res.status(404).json({
        error: {
          statusCode: 404,
          message: "Destination not found"
        },
        result: null
      });
    }
  } catch (err) {
    const errorMsg = (err as Error).message;
    logger.error(`Failed to fetch destination by ID - ${errorMsg}`);
    res.status(500).json({
      error: {
        statusCode: 500,
        message: `Failed to fetch destination by ID - ${errorMsg}`
      },
      result: null
    });
  }
};

const createNewDestination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, imageUrl } = req.body;

  try {
    const result = await sequelize.query(
      "INSERT INTO travel_destinations (name, description, image_url) VALUES (:name, :description, :image_url)",
      {
        replacements: {
          name,
          description,
          image_url: imageUrl
        }
      }
    );

    // Extract the ID of the newly created entry
    const insertedId = result[0] as unknown as number;
    res.status(201).json({
      error: null,
      result: {
        id: insertedId,
        name
      }
    });
  } catch (err) {
    const errorMsg = (err as Error).message;
    logger.error(`Failed to create new destination - ${errorMsg}`);
    res.status(500).json({
      error: {
        statusCode: 500,
        message: `Failed to create new destination - ${errorMsg}`
      },
      result: null
    });
  }
};

// To be made
// const updateDestinationById = async (req: Request, res: Response) => {};

// To be made
// const deleteDestinationById = async (req: Request, res: Response) => {};

export { getAllDestinations, getDestinationById, createNewDestination };
