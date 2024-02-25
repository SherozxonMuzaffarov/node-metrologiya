const Depo = require("../../models/depos");

module.exports = {
  getAll: async (req, res) => {
    try {
      let model = await Depo.find({}).populate('region_id', 'name').populate('depo_boss_id', 'name').populate('depo_sklad_xodim_id', 'name');
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  
    getOne: async (req, res) => {
      try {
        let model = await Depo.findById(req.params.id);
  
        if (!model) {
          res.status(404).json({
            message: `${req.params.id} id record not found`,
          });
        }
  
        res.send(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    create: async (req, res) => {
      console.log(req.body);

      try {
        let model = await Depo.create(req.body);
  
        res.json(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    update: async (req, res) => {
      try {
        const { id } = req.params;

        const updatedModel = await Depo.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
  
        if (!updatedModel) {
          return res.status(404).json({ message: 'Depo not found' });
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
  
        const deletedRowCount = await Depo.findByIdAndDelete(id);
  
        if (!deletedRowCount) {
          return res.status(404).json({ message: 'Depo not found' });
        }
  
        res.json(deletedRowCount);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };