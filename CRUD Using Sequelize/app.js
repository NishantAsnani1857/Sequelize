const express = require('express');
const app = express();
const appRoutes = require('./routes')



app.use('/',appRoutes)





// class User extends Model { }

// User.init({
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING
//     },
//     rollNo: {
//         type: Sequelize.INTEGER
//     },
//     status: {
//         type: Sequelize.ENUM("0", "1"),
//         defaultValue: "1"
//     },
//     created_at: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
//     },
//     updated_at: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
//     }
// }, {
//     sequelize,
//     timestamps: false,
//     modelName: "tbl_Users"
// })

// app.get('/', (req, res) => {
//     res.status(200).json({
//         status: 1,
//         message: "Welcome to home page"
//     })
// })

app.listen(3000, (req, res) => {
    console.log("App listening on Port 3000 ");
})

