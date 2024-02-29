const express = require('express');
const app = express();
const productRoutes=require('./Routes/product')
const studentRoutes=require('./Routes/student')
const port = 3000
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('orm_cli', 'root', 'root', {
    dialect: 'mysql', 
    host:'localhost' 
  });

app.use('/',productRoutes)
app.use('/student',studentRoutes)
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message: "Welcome to home page",
    })
})




app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

module.exports=sequelize