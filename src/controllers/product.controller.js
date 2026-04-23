import prisma from "../config/prisma.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { q = "", page = 1 } = req.query;

    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        name: { contains: q, mode: "insensitive" },
      },
      skip,
      take: limit,
    });

    const total = await prisma.product.count();

    res.json({
      total,
      page,
      products,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};