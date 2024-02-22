const { Product, Measure, Category } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            let model = await Product.findAll();
            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Product.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (!model) {
                res.status(404).json({
                    message: `${req.params.id} id record not found`,
                });
            }
            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    create: async (req, res) => {
        try {
            let { name, measure_id, category_id } = req.body;

            let model = await Product.create({ name, measure_id, category_id });

            res.json({model});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;

            const { name, measure_id, category_id } = req.body

            const [ updatedRow ] = await Product.update(
                { name, measure_id, category_id },
                {
                    where: { id }
                }
            );

            if (updatedRow === 0) {
                return res.status(400).json({ meesgae: 'Product not found'})
            }

            const updatedModel = await Product.findOne({ where: {id}});
            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    delete: async(req, res) => {
        try {
            const { id } = req.params;

            const deletedRowCount = await Product.destroy({ where: { id: req.params.id}});

            if (deletedRowCount === 0) {
                return res.status(404).json({ message: 'Product not found'})
            }

            res.json(deletedRowCount)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
        }
    }
};

