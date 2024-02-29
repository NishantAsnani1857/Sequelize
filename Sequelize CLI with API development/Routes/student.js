const express = require('express')
const router = express.Router();
const { Student, Sequelize } = require('../models');
const Op = Sequelize.Op
const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken');
const auth= require('../middleware');


router.post('/', async (req, res) => {
    await Student.findOne({
        where: {
            email: {
                [Op.eq]: req.body.email
            }
        }
    }).then((data) => {
        if (data) {
            res.status(500).json({
                status: 0,
                message: "Student exists already"
            })
        }
        else {
            const hash = bcrypt.hashSync(req.body.password, 10)
            Student.create({
                name: req.body.name,
                email: req.body.email,
                roll_no: req.body.roll_no,
                password: hash
            }).then((user) => {
                res.status(200).json({
                    message: "Student created sucessfully",
                    data: user
                })
            })
        }

    })
})

router.post('/profile',auth,(req,res)=>{
res.status(200).json({
    data:req.user
})
})

router.post('/login', (req, res) => {
    Student.findOne({
        where: {
            email: req.body.email
        }
    }).then((Student) => {
        if (Student) {
            if (bcrypt.compareSync(req.body.password,Student.password)) {
                let userToken = JWT.sign({
                    email: Student.email,
                    id: Student.id
                }, process.env.JWTSECRET
                    , {
                        issuer: process.env.JWTIssuer,
                        algorithm: process.env.JWTAlgorithm

                    })
                res.status(200).json({
                    message: "Student logged in sucessfully",
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
                message: "Student does not exist with that e-mail"
            })
        }

    }
    )
}

)

router.get('/all', async (req, res) => {
    await Student.findAll({
    })
        .then((data) => {
            res.json({
                message: "Welcome to student page",
                data: data
            })
        })
        .catch((err) => {
            console.log(`Oh no error ${err}`);
        })
})

module.exports = router;


