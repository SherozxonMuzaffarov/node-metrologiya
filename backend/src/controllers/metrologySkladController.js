const MetrologySklad = require('../../models/metrologySklad');
const myCache = require('../../utils/nodeCache')

module.exports = {
    getAll: async (req, res) => {
        try {
            let models = await MetrologySklad.find({}).populate('depo_id', 'name');
            const cachedUser = myCache.get("userData");
            console.log("cachedUser: " + cachedUser);
            res.send(models);
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: 'Internal Server Error' });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await MetrologySklad.findById(req.params.id);

            if (!model) {
                return res.status(404).json({ message: `${req.params.id} id record not found` });
            }

            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        try {
            let { nomi, soni, ishlabChiqarilganYili, raqami, turi, ishi, izoh, depo_id } = req.body;

            let model = await MetrologySklad.create({
                nomi,
                soni,
                ishlabChiqarilganYili,
                raqami,
                turi,
                ishi,
                izoh,
                depo_id,
            });

            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nomi, soni, ishlabChiqarilganYili, raqami, turi, ishi, izoh, depo_id } = req.body;
            
            let updatedModel = await MetrologySklad.findByIdAndUpdate(
                id,
                {
                    nomi,
                    soni,
                    ishlabChiqarilganYili,
                    raqami,
                    turi,
                    ishi,
                    izoh,
                    depo_id,
                },
                { new: true }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'MetrologySklad not found' });
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

            let deletedModel = await MetrologySklad.findByIdAndDelete(id);

            if (!deletedModel) {
                return res.status(404).json({ message: 'MetrologySklad not found' });
            }

            res.json(deletedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};
