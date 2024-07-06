const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json({ message: "product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductsById,
    updateProductsById,
    deleteProductsById
}