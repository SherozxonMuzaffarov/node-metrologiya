const Region = require("../../models/regions");

module.exports = {
    getAll: async (req, res) => {
      try {
        let model = await Region.find({})
        res.send(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ name: 'Internal Server Error' });
      }
    },
  
    getOne: async (req, res) => {
      try {
        let model = await Region.findById(req.params.id);
  
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
      try {
        let { name } = req.body;
  
        let model = await Region.create({ name });
  
        res.json(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    update: async (req, res) => {
      try {
        const { id } = req.params;
  
        const { name } = req.body;
  
        const updatedModel = await Region.findByIdAndUpdate(
          id,
          { name },
          { new: true }
        );
  
        if (!updatedModel) {
          return res.status(404).json({ message: 'Region not found' });
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
  
        const deletedRowCount = await Region.findByIdAndDelete(id);
  
        if (!deletedRowCount) {
          return res.status(404).json({ message: 'Region not found' });
        }
  
        res.json(deletedRowCount);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };
