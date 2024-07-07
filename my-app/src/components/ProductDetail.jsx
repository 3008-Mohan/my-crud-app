import React, { useEffect, useState } from "react";
import {
  getProductById,
  deleteProductById,
  updateProductById,
} from "../api/productService";

const ProductDetail = ({ productID, setProduct, onProductDelete }) => {
  const [product, setProducts] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productID);
        setProducts(data);
        setNewProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productID]);

  if (!product) return <p>Loading...</p>;

  const handleProduct = () => {
    setProduct(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProductById(productID);
      onProductDelete(productID);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = () => {
    setIsEdit(true);
  };

  const handleText = (e) => {
    setNewProduct({
      ...newProduct,
      name: e.target.value,
    });
  };

  const handleQuantity = (e) => {
    setNewProduct({
      ...newProduct,
      quantity: e.target.value,
    });
  };

  const handlePrice = (e) => {
    setNewProduct({
      ...newProduct,
      price: e.target.value,
    });
  };

  const updateProduct = async () => {
    try {
      await updateProductById(productID, newProduct);
      setProducts(newProduct);
      setIsEdit(false);
    } catch (error) {
      console.log(error, "Update failed");
    }
  };

  return (
    <div>
      {isEdit ? (
        <>
          <input
            type="text"
            value={newProduct.name}
            onChange={handleText}
          />
          <input
            type="number"
            value={newProduct.quantity}
            onChange={handleQuantity}
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={handlePrice}
          />
          <button onClick={updateProduct}>Save and Submit</button>
        </>
      ) : (
        <>
          <h1>{product.name}</h1>
          <p>{product.quantity}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleProduct}>Go Back</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
