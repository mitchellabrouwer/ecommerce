import { PrismaClient } from "@prisma/client";

export const getProducts = async (prisma: PrismaClient) => {
  const products = await prisma.product.findMany({});
  return products;
};
