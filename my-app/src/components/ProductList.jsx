import React, { useEffect, useState } from 'react';
import { getProducts, createProduct } from '../api/productService';
import ProductDetail from './ProductDetail';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [Product, setProduct] = useState(false);
    const [ProductID, setProductID] = useState(-1);
    const [newProduct, setNewProduct] = useState({
        name: "",
        quantity: 0,
        price: 0
    });

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
    }, [products]);

    const handleName = (e) => {
        setNewProduct({
            ...newProduct,
            name: e.target.value
        });
    };

    const handleQuantity = (e) => {
        setNewProduct({
            ...newProduct,
            quantity: e.target.value
        });
    };

    const handlePrice = (e) => {
        setNewProduct({
            ...newProduct,
            price: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const createdProduct = await createProduct(newProduct);
            setProducts([...products, createdProduct]);
            setNewProduct({ name: "", quantity: 0, price: 0 });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const showProduct = (product) => {
        setProduct(true);
        setProductID(product);
    };

    const handleProductDelete = (id) => {
        setProducts(products.filter(product => product._id !== id));
        setProduct(false);
    };

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
                    <div>
                        <h2>Add New Product</h2>
                        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                            <input type="text" placeholder="Name" value={newProduct.name} onChange={handleName} required />
                            <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={handleQuantity} required />
                            <input type="number" placeholder="Price" value={newProduct.price} onChange={handlePrice} required />
                            <button type="submit">Add Product</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductList;
