const express = require('express')
const router = express.Router();
const { Product, Sequelize } = require('../models');
const Op = Sequelize.Op



router.use(express.json())


router.get('/products', async (req, res) => {
    await Product.findAll({
        // attributes: ["id", "name"],
        // limit: 10,
        where: {
            name: {
                [Op.like]: "S%Bacon",

            },
            // id: {
            //     [Op.between]: [314, 317]
            // },
        }

    })
        .then((data) => {
            res.json({
                message: "Welcome to product page",
                data: data
            })
        })
        .catch((err) => {
            console.log(`Oh no error ${err}`);
        })
})



module.exports = router;