const handelSignIn=(req,res,db,bcrypt)=>{
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).json("Incorrect submission !.")
        }
        db.select('email','hash').from('login')
        .where('email','=',email)
        .then(data=>{
            //console.log(data);
            const isValid=bcrypt.compareSync(password,data[0].hash);
            //console.log(isValid);
            if(isValid){
                return db.select('*').from('applicant')
                .where('email','=',email)
                .then(user=>{
                    res.json(user[0])
                })
                .catch(err=>res.status(400).json("Unable to get user !"))
            }else{
                res.status(400).json("Wrong credential !...")
            }
        }).catch(err=>res.status(400).json("wrong credential"))
    }

module.exports={
    handelSignIn
}