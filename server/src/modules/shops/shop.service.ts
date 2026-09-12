import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../../configs/prisma.js";
import { addTime } from "../../utils/dateFns.js";
import { AppError } from "../../utils/appError.js";
import { AddShop, Author, GetShopOutput } from "zs-phone-common";

export const createShopService = async (
    { name, address, gst }: AddShop,
    author: Author
): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        let subscription = await tx.subscription.findFirst({
            where: {
                userId: author.id,
                plan: {
                    code: "free"
                }
            },
        });

        if (!subscription) {
            const freePlan = await tx.plan.findFirst({
                where: {
                    code: "free"
                },
                select:{
                    id: true
                }
            })
            subscription = await tx.subscription.create({
                data: {
                    userId: author.id,
                    planId: freePlan ? freePlan?.id : "",
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
                    trialStartedAt: new Date(),
                    trialEndsAt: endOfDay(addTime({days: 15}))
                },
            });
        }

        if (
            subscription.status !== "ACTIVE" ||
            subscription.endsAt < new Date()
        ) {
            throw new AppError(
                "Your subscription has expired. Please renew it to create another shop.",
                403
            );
        }

        const shop = await tx.shop.create({
            data: {
                name,
                address,
                gst,
                ownerId: author.id,
            },
        });

        await tx.shopMember.create({
            data: {
                userId: author.id,
                shopId: shop.id,
                role: "OWNER",
            },
        });
    });
};

export const getShopsService = async (author : Author) : Promise<GetShopOutput | null> => {
    const shops = await prisma.user.findUnique({
        where:{
            id: author.id
        },
        select: {
            memberships:{
                select:{
                    shop:{
                        select:{
                            name: true,
                            id: true
                        }
                    },
                    shopId: true,
                    role: true
                }
            }
        }
    })
    return shops
}