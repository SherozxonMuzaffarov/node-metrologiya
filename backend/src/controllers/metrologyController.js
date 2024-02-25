const Metrology = require('../../models/metrology');

module.exports = {
    getAll: async (req, res) => {
        try {
            let model = await Metrology.find({});
            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Metrology.findById( req.params.id );
            res.send(model);
            if (!model) {
                res.status(404).json({ message: `${req.params.id} id record not found` });
            }

            console.log("model " + model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        try {
            let model = await Metrology.create(req.body);
            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;

            const updatedModel = await Metrology.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'Metrology not found' });
            }

            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedModel = await Metrology.findOneAndDelete({ _id: id });

            if (!deletedModel) {
                return res.status(404).json({ message: 'Metrology not found' });
            }

            res.json({ message: 'Metrology deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};
