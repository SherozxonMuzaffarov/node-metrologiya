const { Metrology_sklad } = require('../../models')

module.exports = {
    getAll: async(req, res) => {
        try {
            let model = await Metrology_sklad.findAll({});
            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: 'Internal Server Error'})
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Metrology_sklad.findOne({
                where: {
                    id: req.params.id,
                }
            })

            if (!model) {
                res.status(404).json({ message: `${req.params.id} id record not found`});
            }

            res.send(model)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    create: async(req, res) => {
        try {
            let { name } = req.body;

            let model = await Metrology_sklad.create({ name });
            
            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            
            const { name } = req.body;

            const [ updatedRow ] = await Metrology_sklad.update(
                { name },
                {
                    where: { id },
                }
            );
            if (updatedRow === 0) {
                return res.status(404).json({ message: 'Metrology_sklad not found'})
            }

            const updatedModel = await Metrology_sklad.findOne({ where: { id }});
            
            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const deletedRowCount = await Metrology_sklad.destroy({ where : { id }});
            
            if (deletedRowCount === 0) {
                return res.status(404).json({ message: 'Metrology_sklad not found'})
            }

            res.json(deletedRowCount)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
    }
}

