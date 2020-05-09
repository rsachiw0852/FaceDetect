const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');
const register=require('./Conroller/Register');
const signIn=require('./Conroller/SignIn');
const image=require('./Conroller/image');

const db=knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'rajeevkumarsingh',
    password : '',
    database : 'smart_brain'
    }
});

    // postgres.select("*").from('applicant').then(data=>{
    //     console.log(data);
    // })
    //console.log(postgres.select('*').from('applicant'));



const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
/*
const database={
users:[
    {
        id:"123",
        name:'Rajeev',
        email:"rsachiw0123@gmail.com",
        password:"0852",
        entries:0,
        joined:new Date(),
    },
    {
        id:"124",
        name:'maa',
        email:"maa0123@gmail.com",
        password:"0123",
        entries:0,
        joined:new Date(),
    }
]
,
login:[
    {
        id:'852',
        hash:'',
        email:'rsachiw0123@gmail.com'
    }
]

}
*/

app.get('/',(req,res)=>{
    res.send("it's working !")
    //res.send("This is working.");
    //console.log("It is working.");
})
//signIn
/*
app.post('/signIn',(req,res)=>{
    //res.send("Signing...");
    res.json("Signing....")
})
*/
//signIn
app.post('/signIn',(req,res)=>{signIn.handelSignIn(req,res,db,bcrypt)});
//Register---
app.post('/register',(req,res)=>{register.handelRegister(req,res,db,bcrypt)})

//profile...

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found=false;

db.select('*').from('applicant').where({id})
.then(
    users=>{
        if(users.length>0){
            res.json(users[0])
        }
        else{
            res.status(400).json("Not Found !")
        }
    })
    .catch(err=>{
        res.status(400).json("error getting user !...")
    })
});
//Image----------------------
app.put('/image',(req,res)=>{image.handelImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handelApi(req,res)})

app.listen(process.env.Port || 3000,()=>{
    console.log(`app is running on Port  ${process.env.Port}`);
});


// app.listen(3000,()=>{
//     console.log("App is running on 3000");
// })
