import { Request, Response } from "express";
import { Product } from "../types/product";

const products = [
  {
    _id: "1",
    name: "Shoe",
    price: 2000,
    image: "https://picsum.photos/200/200?random=1",
  },
  {
    _id: "2",
    name: "Watch",
    price: 1500,
    image: "https://picsum.photos/200/200?random=2",
  },

 
];

export const getProducts = (req: Request, res: Response): void => {
  res.json(products);
};