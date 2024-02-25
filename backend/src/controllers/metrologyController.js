const { Metrology } = require ('../../models')

module.exports = {
    getAll: async (req, res) => {
        try {
            let model = await Metrology.findAll();

            res.send(model)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Metrology.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if(!model){
                res.status(404).json({ message: `${req.params.id} id record not found`})
            }

            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    create: async (req, res) => {
        try {
            let model = await Metrology.create(req.body)

            res.json(model)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error"})
        }
    },

    update: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req. body;

            const [ updatedRows ] = await Metrology.update(
                { name },
                {
                    where: { id },
                }
            );

            if(updatedRows === 0){
                return res.status(404).json({ message: 'Metrology not found'});
            }
            const updatedModel = await Metrology.findOne({ where: { id }});
            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedRowCount = await Metrology.destroy({
                where: { id }
            })

            if(deletedRowCount === 0) {
                return res.status(404).json({ message: "Metrology not found"})
            }

            res.json({ message: 'Metrology deleted successfully'})
        } catch (error) {
            console.error(error);
            res.status(500). json({ message: 'Internal Server Error'})
        }
    }
}

