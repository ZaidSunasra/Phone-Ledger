import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../../configs/prisma.js";
import { addTime } from "../../utils/dateFns.js";
import { AppError } from "../../utils/appError.js";
import { AddOrganization, Author } from "zs-phone-common";

export const createOrganizationService = async (
    { name, address, gst }: AddOrganization,
    author: Author
): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        let subscription = await tx.userSubscription.findUnique({
            where: {
                userId: author.id,
            },
        });

        if (!subscription) {
            subscription = await tx.userSubscription.create({
                data: {
                    userId: author.id,
                    type: "TRIAL",
                    status: "ACTIVE",
                    startsAt: startOfDay(new Date()),
                    endsAt: endOfDay(addTime({ days: 15 })),
                },
            });

            await tx.user.update({
                where: {
                    id: author.id,
                },
                data: {
                    hasUsedTrial: true,
                },
            });
        }

        if (
            subscription.status !== "ACTIVE" ||
            subscription.endsAt < new Date()
        ) {
            throw new AppError(
                "Your subscription has expired. Please renew it to create another organization.",
                403
            );
        }

        const organization = await tx.organization.create({
            data: {
                name,
                address,
                gst,
                ownerId: author.id,
            },
        });

        await tx.organizationMember.create({
            data: {
                userId: author.id,
                organizationId: organization.id,
                role: "OWNER",
            },
        });
    });
};