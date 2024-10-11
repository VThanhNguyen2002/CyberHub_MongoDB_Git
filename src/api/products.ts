export const fetchProducts = async () => {
  const response = await fetch(`${process.env.VITE_API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
};