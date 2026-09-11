import { NextFunction, Request, Response } from "express";
import { createOrganizationService } from "./organization.service.js";
import { addOrganizationSchema, Author, ErrorResponse, SuccessResponse } from "zs-phone-common";

export const addOrganizationController = async (
    req: Request,
    res: Response<SuccessResponse | ErrorResponse>,
    next: NextFunction
): Promise<any> => {

    const { name, gst, address } = req.body;
    const author: Author = res.locals.author;

    const validation = addOrganizationSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }

    try {

        await createOrganizationService(validation.data, author);

        res.status(201).json({
            message:
                "Your organization has been created successfully. You're now ready to manage your inventory, sales, and team from one place.",
        });

    } catch (error) {
        next(error)
    }
}

