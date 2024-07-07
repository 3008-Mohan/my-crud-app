const API_URL = 'http://localhost:3000/api/products';

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const deleteProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProductById = async (id, updatedProductData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProductData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};



