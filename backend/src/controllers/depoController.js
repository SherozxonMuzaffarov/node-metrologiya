const { Depo, Region, User } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
      try {
        let model = await DepoModel.find()
          .populate({
            path: 'region',
            model: 'Region',
            select: ['id', 'name'],
          })
          .populate({
            path: 'boss',
            model: 'User',
            select: ['id', 'name'],
          })
          .populate({
            path: 'sklad_xodim',
            model: 'User',
            select: ['id', 'name'],
          });
  
        res.send(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  
    getOne: async (req, res) => {
      try {
        let model = await DepoModel.findById(req.params.id);
  
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
        let {
          name,
          region_id,
          depo_boss_id,
          depo_marketing_id,
          depo_bugalter_id,
          depo_sklad_xodim_id,
        } = req.body;
  
        let model = await DepoModel.create({
          name,
          region: region_id,
          boss: depo_boss_id,
          sklad_xodim: depo_sklad_xodim_id,
          // Add other fields as needed
        });
  
        console.log('Hello');
        res.json(model);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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
  
        const updatedModel = await DepoModel.findByIdAndUpdate(
          id,
          {
            name,
            region: region_id,
            boss: depo_boss_id,
            sklad_xodim: depo_sklad_xodim_id,
            // Add other fields as needed
          },
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
  
        const deletedRowCount = await DepoModel.findByIdAndDelete(id);
  
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