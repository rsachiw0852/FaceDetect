const handelRegister=(req,res,db,bcrypt)=>{
    //console.log("Register");
    const {email,name,password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json("incorrect for submission !")
    }
    const hash=bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{

            return trx('applicant')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            }).then(user=>{
            //res.json(database.users[database.users.length-1])
            res.json(user[0]);
            })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

/*
    bcrypt.hash("bacon", null, null, function(err, hash) {
        console.log(hash);
        // Store hash in your password DB.
    });


    */
    
    .catch(err=>{
        res.status(400).json('Try next time !..');
    })
}

module.exports={
    handelRegister:handelRegister
}