import {Product} from '../models/Product.models.js';

export const addProducts = async (req, res) => {
  console.log('Inside addProducts handler');
console.log('BODY:', req.body);
console.log('FILE:', req.file);

  try {
        console.log(req.body);
    const sellerId = req.sellerId; // extracted from JWT via middleware
    const {
      title,
      description,
      category,
      rental_price,
      quantity,
    } = req.body;

    const imagePath=req.file?`/uploads/${req.file.filename}`:null;
    console.log("Image path:", imagePath);
    console.log("Seller ID:", sellerId);
   console.log("Product data:", { title, description, category, rental_price,quantity, image_url: imagePath });

    const newProduct = new Product({
      seller_id: sellerId,
      title,
      description,
      category,
      rental_price,
      quantity,
      image_url:imagePath,
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error while adding product' });
  }
};


export const updateProducts = async (req, res) => {
  try {
    const sellerId = req.sellerId; // extracted from JWT via middleware
    const productId = req.params.id;

    const {
      title,
      description,
      category,
      rental_price,
      image_url,
      is_available
    } = req.body;

    const product = await Product.findOne({ _id: productId, seller_id: sellerId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (rental_price !== undefined) product.rental_price = rental_price;
    if (image_url !== undefined) product.image_url = image_url;
    if (is_available !== undefined) product.is_available = is_available;

    await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

export const getProductsBySellerId = async (req, res) => {
  try {
    const sellerId = req.sellerId; // Set by verifyToken middleware

    const products = await Product.find({ seller_id: sellerId });

    res.status(200).json({
      message: 'Products fetched successfully',
      products
    });
  } catch (error) {
    console.error('Error fetching products by seller ID:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const sellerId = req.sellerId;  // set by verifyToken middleware
    const productId = req.params.id;

    // Find and delete product only if it belongs to the seller
    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      seller_id: sellerId
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

