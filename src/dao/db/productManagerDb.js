import productModel from "../models/product.model.js";

class ProductManager {
    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {

            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const existingProduct = await productModel.findOne({ code: code });
            if (existingProduct) {
                console.log("El codigo debe ser único");
                return;
            }

            const newProduct = new productModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });
            await newProduct.save();

        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }
    async getProducts() {
        try {
            const arrayProducts = await productModel.find();
            return arrayProducts;
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const searchedProduct = await productModel.findById(id);
            if (!searchedProduct) {
                console.log("Producto no encontrado");
                return null;
            } else {
                console.log("Producto encontrado");
                return searchedProduct;
            }
        } catch (error) {
            console.log("Error al buscar producto por id", error);
            throw error;
        }
    }

    async updateProduct(id, updateProduct) {
        try {
            const product = await productModel.findByIdAndUpdate(id, updateProduct);
            if (!product) {
                console.log("No se encuentra el producto que queres actualizar");
                return null;
            } else {
                console.log("Producto actualizado con exito");
                return product;
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productModel.findByIdAndDelete(id); 
            if(!deleteProduct) {
                console.log("El producto que intentas eliminar no fue encontrado");
                return null; 
            } else {
                console.log("Producto eliminado correctamente");
                return deleteProduct; 
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

export default ProductManager;
