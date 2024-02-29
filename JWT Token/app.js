const express = require('express');
const app = express();
const PORT = 3000
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Sequelize, Model } = require('sequelize');
const auth = require('./middleware')

app.use(express.json())

const sequelize = new Sequelize('orm_jwt', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql"
})

sequelize.authenticate()
    .then(() => {
        console.log("Connection success");
    }).catch((err) => {
        console.log("Oh no error ", err);
    })



let User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        require: true
    },
    email: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(150),
        require: true,
        allowNull: false,
    },
},
    {
        modelName: "User",
        timestamps: false
    })

sequelize.sync();


app.get('/', (req, res) => {
    res.status(200).json({
        status: 1,
        message: "Welcome to home page"
    })
})

app.post('/user', async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const email = req.body.email
    await User.findOne({
        where: {
            email
        }
    }).then(async (user) => {
        if (user) {
            res.status(200).json({
                message: "User already exists"
            })
        }
        else {
            await User.create({
                ...req.body,
                password: hash
            }).then((response) => {
                res.status(200).json({
                    message: "User created sucessfully"
                })
            })
                .catch((e) => console.log(`Oh no error ${e}`))
        }
    })


})

app.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((User) => {
        if (User) {
            if (bcrypt.compareSync(req.body.password, User.password)) {
                let userToken = JWT.sign({
                    email: User.email,
                    id: User.id
                }, process.env.JWTSECRET
                    , {
                        expiresIn: process.env.JWTExpireTime, //time in s
                        issuer: process.env.JWTIssuer,
                        algorithm: process.env.JWTAlgorithm

                    })
                res.status(200).json({
                    message: "User logged in sucessfully",
                    token: userToken
                })

            } else {
                res.status(500).json({
                    message: "Password didn't match"
                })
            }
        }
        else {
            res.status(500).json({
                message: "User does not exist with that e-mail"
            })
        }

    }
    )
}

)

app.post('/profile', auth, (req, res) => {
    console.log("I am authenticated");
    res.status(200).json({
        userdata: req.user,
        message: "Token value parsed"
    })
})

app.listen(PORT, () => {
    console.log("Listening to port 3000 ");
})