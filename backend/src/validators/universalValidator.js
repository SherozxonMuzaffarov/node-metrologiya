const Joi = require('joi')

module.exports = {
    validate: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            nomi: Joi.string().optional(),
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            username: Joi.string().optional(),
            id: Joi.optional(),
            password: Joi.optional(),
            depo_boss_id: Joi.optional(),
            user_id: Joi.number().optional(),
            user_table_id: Joi.number().optional(),
            depo_sklad_xodim_id: Joi.optional(),
            region_id: Joi.optional(),
            phone_number: Joi.number().optional(),
            quantity: Joi.number().optional(),
            soni: Joi.number().optional(),
            price: Joi.number().optional(),
            soni: Joi.number().optional(),
            ishlabChiqarilganYili: Joi.number().optional(),
            number: Joi.number().optional(),
            depo_id: Joi.optional(),
            role: Joi.optional(),
            raqami: Joi.optional(),
            turi: Joi.optional(),
            __v: Joi.optional(),
            ishi: Joi.optional(),
            _id: Joi.optional(),
            serDavriyligi: Joi.optional(),
            serRaqamiSanasi: Joi.optional(),
            izoh: Joi.optional(),
            shartnomaRaqamiSanasi: Joi.optional(),
            saqlanishJoyi: Joi.optional(),
            serBerganKorxona: Joi.optional(),
            sarflanganMablag: Joi.optional(),
            serKeyingiSanasi: Joi.optional(),
            datetime: Joi.optional(),
            region: Joi.object().optional(),
            boss: Joi.object().optional(),
            sklad_xodim: Joi.object().optional(),
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional()
    });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    }
}
