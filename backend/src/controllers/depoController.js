const { Depo, Region, User } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            let model = await Depo.findAll({
                include: [
                    {
                        model: Region,
                        as: "region",
                        attributes: ["id", "name"],
                    },
                    {
                        model: User,
                        as: 'boss', 
                        attributes: ['id', 'name'], 
                    },
                    {
                        model: User,
                        as: 'sklad_xodim', 
                        attributes: ['id', 'name'], 
                    },
                ]
            });
            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Depo.findOne();

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
            let {
                name,
                region_id,
                depo_boss_id,
                depo_marketing_id,
                depo_bugalter_id,
                depo_sklad_xodim_id,
            } = req.body;

            let model = await Depo.create({
                name,
                region_id,
                depo_boss_id,
                depo_marketing_id,
                depo_bugalter_id,
                depo_sklad_xodim_id,
            });
            console.log("Hello");
            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;

            const {
                name,
                region_id,
                depo_boss_id,
                depo_sklad_xodim_id,
            } = req.body;

            const [updatedRow] = await Depo.update(
                {
                    name,
                    region_id,
                    depo_boss_id,
                    depo_sklad_xodim_id,
                },
                {
                    where: { id },
                }
            );
            if (updatedRow === 0) {
                return res.status(404).json({ message: "Depo not found" });
            }

            const updatedModel = await Depo.findOne({ where: { id } });

            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedRowCount = await Depo.destroy({ where: { id } });

            if (deletedRowCount === 0) {
                return res.status(404).json({ message: "Depo not found" });
            }

            res.json(deletedRowCount);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
