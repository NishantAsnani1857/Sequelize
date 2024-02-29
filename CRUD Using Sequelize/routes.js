const express = require('express')
const router = express.Router();
const { Sequelize, Model } = require('sequelize');



router.use(express.json())


const sequelize = new Sequelize('node_orm', "root", "root", {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate()
    .then(() => {
        console.log("Connection success");
    }).catch((err) => {
        console.log("Oh no error ", err);
    })


let User = sequelize.define("tbl_users", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    rollNo: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM("0", "1"),
        defaultValue: "1"
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
},
    {
        modelName: "User",
        timestamps: false
    })

sequelize.sync();  //Method-1 to create model

router.post('/user', async (req, res) => {

    
    await User.create({
        name: "Nishant",
        email: "nishant@gmail.com",
        rollNo: 92,
        status: "1"
    })
        .then((response) => {
            res.status(200).json({
                message: "User created sucessfully"
            })
            console.log(response);
        })
        .catch((e) => console.log(`Oh no error ${e}`))

})


router.post('/bulkUser', async (req, res) => {
    await User.bulkCreate([
        {
            name: "user1",
            email: "user@gmail.com",
            rollNo: 95,
            status: "1"
        },
        {
            name: "ghost",
            email: "ghost@gmail.com",
            rollNo: 98,
            status: "0"
        },
    ])
        .then((response) => {
            res.status(200).json({
                message: "Users created sucessfully"
            })
            console.log(response);
        })
        .catch((e) => console.log(`Oh no error ${e}`))

})

router.get('/users', async (req, res) => {
    await User.findAll({
        where: {
            status: "0"
        }
    })
        .then((users) => {
            res.status(200).json({
                message: "Users found",
                data: users
            })
            console.log(users);
        })
        .catch((e) => console.log(`Oh no error ${e}`))
})

router.get('/user-raw', (req, res) => {
    sequelize.query('SELECT * from tbl_users', {
        type: sequelize.QueryTypes.SELECT
    }).then((users) => {
        res.status(200).json({
            message: "Users found",
            data: users
        })
        console.log(users);
    })
        .catch((e) => console.log(`Oh no error ${e}`))
})


router.put('/user-update-raw', (req, res) => {
    sequelize.query(`UPDATE tbl_users set name="${req.body.name}",email="${req.body.email}" where id=${req.body.id}`, {
        type: sequelize.QueryTypes.UPDATE
    }).then((users) => {
        res.status(200).json({
            message: "User Updated",
            data: users
        })
        console.log(users);
    })
        .catch((e) => console.log(`Oh no error ${e}`))
})


router.put('/user', async (req, res) => {
    console.log(req.body);
    await User.update({
        ...req.body
    },
        {
            where: {
                id: req.body.id
            }
        }).then((user) => {
            res.status(200).json({
                message: "User updated",
                data: user
            })
            console.log(user);
        })
        .catch((e) => console.log(`Oh no error ${e}`))
})


router.delete('/user/:id', async (req, res) => {
    console.log(req.body);
    await User.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then((user) => {
            res.status(200).json({
                message: "User deleted",
                data: user
            })
            console.log(user);
        })
        .catch((e) => console.log(`Oh no error ${e}`))
})

router.delete('/user-delete-raw/:id', (req, res) => {
    sequelize.query(`DELETE from tbl_users where id=${req.params.id}`, {
        type: sequelize.QueryTypes.DELETE
    }).then((users) => {
        res.status(200).json({
            message: "User Deleted",
            data: users
        })
        console.log(users);
    })
        .catch((e) => console.log(`Oh no error ${e}`))
})

module.exports = router