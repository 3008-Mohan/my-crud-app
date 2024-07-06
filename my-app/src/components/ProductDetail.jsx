import React, { useEffect, useState } from 'react';
import { getProductById, deleteProductById } from '../api/productService';

const ProductDetail = ({ productID, setProduct, onProductDelete }) => {
    const [product, setProducts] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(productID);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productID]);

    if (!product) return <p>Loading...</p>;

    const handleProduct = () => {
        setProduct(false);
    }

    const handleDelete = async () => {
        try {
            await deleteProductById(productID);
            onProductDelete(productID);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.quantity}</p>
            <p>Price: ${product.price}</p>
            <button onClick={handleProduct}>Go Back</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ProductDetail;
