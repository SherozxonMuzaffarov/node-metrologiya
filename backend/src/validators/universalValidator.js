const Joi = require('joi')

module.exports = {
    validate: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            username: Joi.string().optional(),
            id: Joi.optional(),
            password: Joi.optional(),
            depo_boss_id: Joi.number().optional(),
            user_id: Joi.number().optional(),
            depo_marketing_id: Joi.number().optional(),
            user_table_id: Joi.number().optional(),
            depo_bugalter_id: Joi.number().optional(),
            depo_sklad_xodim_id: Joi.number().optional(),
            region_id: Joi.number().optional(),
            phone_number: Joi.number().optional(),
            measure_id: Joi.number().optional(),
            category_id: Joi.number().optional(),
            quantity: Joi.number().optional(),
            price: Joi.number().optional(),
            total_sum: Joi.number().optional(),
            number: Joi.number().optional(),
            expense_id: Joi.number().optional(),
            expense_table_id: Joi.number().optional(),
            with_tax: Joi.boolean().optional(),
            depo_id: Joi.number().optional(),
            role: Joi.optional(),
            img: Joi.optional(),
            expense_tables: Joi.optional(),
            datetime: Joi.optional(),
            region: Joi.object().optional(),
            boss: Joi.object().optional(),
            marketing: Joi.object().optional(),
            bugalter: Joi.object().optional(),
            sklad_xodim: Joi.object().optional(),
            depo: Joi.object().optional(),
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
