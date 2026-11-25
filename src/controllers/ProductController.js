import Product from "../models/Product.js";

class ProductController {

    async GetAll(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (err) {
            res.status(404).json("Ошибка при получении товаров: " + err);
        }
    }

    async Create(req, res) {
        try {
            const { brand, model, title, description, price, quantity, storage, color, screen, camera, battery, os, cpu, ram } = req.body;
            const product = await Product.create({
                brand, model, title, description, price, quantity, storage, color,
                specs: { screen, camera, battery, os, cpu, ram }
            });
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json("Ошибка при создании товара: " + err);
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { brand, model, title, description, price, quantity, storage, color, screen, camera, battery, os, cpu, ram } = req.body;

            const product = await Product.findByIdAndUpdate(
                id,
                {
                    brand, model, title, description, price, quantity, storage, color,
                    specs: { screen, camera, battery, os, cpu, ram }
                },
                { new: true, runValidators: true }
            );

            if (!product) {
                return res.status(404).json("Товар не найден");
            }

            res.status(200).json(product);
        } catch (err) {
            res.status(400).json("Ошибка при обновлении товара: " + err);
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).json("Товар не найден");
            }

            res.status(200).json({ message: "Товар удалён" });
        } catch (err) {
            res.status(400).json("Ошибка при удалении товара: " + err);
        }
    }
}

export default new ProductController();
