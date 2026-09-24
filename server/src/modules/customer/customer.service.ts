import { GetCustomerDetailOutput, Membership } from "@phone-ledger/shared"
import { prisma } from "../../configs/prisma.js"

export const getCustomerDetailsService = async (
  membership: Membership,
  customerDetail: string
): Promise<GetCustomerDetailOutput | null> => {
  const customer = await prisma.customer.findFirst({
    where: {
      shopId: membership.shopId,
      OR: [
        {
          phoneNumber: {
            contains: customerDetail.trim(),
            mode: "insensitive",
          },
        },
        {
          aadharNumber: {
            contains: customerDetail.trim(),
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      aadharNumber: true,
    },
  })
  return customer
}
