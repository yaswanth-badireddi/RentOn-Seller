import { create } from "zustand";
import axios from "axios";

// const API_URL = "http://localhost:5050/api/product";
const API_URL="https://renton-seller.onrender.com/api/product";

export const useProductStore = create((set) => ({
	isLoading: false,
	error: null,
	message: null,
    products: [],


	addProduct: async (formData) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.post(`${API_URL}/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			});

			set({
				isLoading: false,
				message: response.data.message,
				error: null,
			});

			return response.data;
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error adding product",
			});
			throw error;
		}
	},

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/`, {
  withCredentials: true,
});
      set({ products: response.data.products, isLoading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch products', isLoading: false });
    }
  },
}));
