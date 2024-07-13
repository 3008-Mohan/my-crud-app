import React, { useEffect, useState } from "react";
import { getProducts, createProduct } from "../api/productService";
import ProductDetail from "./ProductDetail";
import Bike from "../assets/images/bike.jpg";
import HondaHness from "../assets/images/honda.jpg";
import hero from "../assets/images/hero.jpg";
import hunter from "../assets/images/hunter.jpg";
import raider from "../assets/images/raider.jpg";
import harley from "../assets/images/harley.jpg";
import "./ProductList.css";

const productImages = {
  "Hunter 350": hunter,
  "TVS Raider": raider,
  "Maverick 440": hero,
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [Product, setProduct] = useState(false);
  const [ProductID, setProductID] = useState(-1);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  const handleName = (e) => {
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

  const handleSubmit = async () => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: "", quantity: 0, price: 0 });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const showProduct = (product) => {
    setProduct(true);
    setProductID(product);
  };

  const handleProductDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id));
    setProduct(false);
  };

  return (
    <div className="main-Page">
      <div className={`main-Page-header ${isAdd ? "yes":"no"}`}>
        <div className="main-Page-header-right">
          <div className="title">
            <h1>
              <span>Whiz</span>
              <span className="word-split">Wheels</span>
            </h1>
          </div>
        </div>
        <div className="main-header-left" onClick={()=>{setIsAdd(!isAdd)}}>
          <div className="add-whiz">{isAdd ? "GO BACK" : "ADD WHIZ"}</div>
        </div>
      </div>
      {isAdd ? (
        <>
          <div>
            <h2>Add New Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleName}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={handleQuantity}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={handlePrice}
                required
              />
              <button type="submit">Add Product</button>
            </form>
          </div>
        </>
      ) : (
        <>
          {" "}
          {Product ? (
            <ProductDetail
              productID={ProductID}
              setProduct={setProduct}
              onProductDelete={handleProductDelete}
            />
          ) : (
            <div className="main-Page-content">
              <div className="image-container bike">
                <img src={Bike} alt="" className="main-wallpaper" />
                <div className="myride">
                  READY TO <span className="whiz">WHIZ</span>
                </div>
              </div>
              <div className="whiz-container">
                <div className="product-list">
                  <>
                    {products.map((product) => (
                      <div key={product._id} className="image-container whizzz">
                        <img
                          src={productImages[product.name] || Bike}
                          alt={product.name}
                          className={`product-image main-wallpaper ${
                            productImages[product.name]
                          } ${product.name}`}
                        />
                        <div
                          className="name"
                          onClick={() => {
                            showProduct(product._id);
                          }}
                        >
                          {product.name}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
