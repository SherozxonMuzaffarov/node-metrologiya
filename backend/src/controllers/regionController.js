const { Region, Depo } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            let model = await Region.findAll({
                include: [
                    {
                        model: Depo,
                        as: "depos",
                        attributes: ["id", "name"],
                    },
                ],
            });
            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: "Internal Server Error" });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Region.findOne({
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
            let { name } = req.body;

            let model = await Region.create({ name });

            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;

            const { name } = req.body;

            const [updatedRow] = await Region.update(
                { name },
                {
                    where: { id },
                }
            );
            if (updatedRow === 0) {
                return res.status(404).json({ message: "Region not found" });
            }

            const updatedModel = await Region.findOne({ where: { id } });

            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedRowCount = await Region.destroy({ where: { id } });

            if (deletedRowCount === 0) {
                return res.status(404).json({ message: "Region not found" });
            }

            res.json(deletedRowCount);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
