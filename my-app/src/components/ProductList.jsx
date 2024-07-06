import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import ProductDetail from './ProductDetail';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [Product, setProduct] = useState(false);
    const [ProductID, setProductID] = useState(-1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const showProduct = (product) => {
        setProduct(true);
        setProductID(product);
    }

    const handleProductDelete = (id) => {
        setProducts(products.filter(product => product._id !== id));
        setProduct(false);
    }

    return (
        <>
            {Product ? 
                <ProductDetail 
                    productID={ProductID} 
                    setProduct={setProduct} 
                    onProductDelete={handleProductDelete} 
                /> : 
                <div>
                    <h1>Product List</h1>
                    <ul>
                        {products.map(product => (
                            <li key={product._id} onClick={() => { showProduct(product._id) }}>
                                {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
};

export default ProductList;
