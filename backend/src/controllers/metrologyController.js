const Metrology = require('../../models/metrology');
const myCache = require('../../utils/nodeCache')

module.exports = {
    getAll: async (req, res) => {
        try {
            const user = myCache.get('userData')
            if (user.role == 'Admin') {
                let model = await Metrology.find({}).populate('depo_id', 'name');
                res.send(model);
            } else {
                let model = await Metrology.where('depo_id').equals(user.depo_id).populate('depo_id', 'name');
                res.send(model);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await Metrology.findById( req.params.id );
            if (!model) {
                res.status(404).json({ message: `${req.params.id} id record not found` });
            }
            res.send(model);
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

            const updatedModel = await Metrology.findByIdAndUpdate(
                id,
                req.body,
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
