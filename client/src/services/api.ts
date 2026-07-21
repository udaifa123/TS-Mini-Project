import axios from "axios";
import type { Product } from "../types/product";

const API = "http://localhost:5000/api";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API}/products`);
  return res.data;
};