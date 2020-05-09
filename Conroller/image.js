const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey:'af5a5601d8704af2a846984f39717e7e'
  });
 const handelApi=(req,res)=>{
     app.models.predict(
         Clarifai.FACE_DETECT_MODEL,req.body.input
     )
     .then(data=>{
         res.json(data)
     })
     .catch(err=>res.status(400).json("Unable to work with api"));
 }
const handelImage=(req,res,db)=>{
        const {id}=req.body
        db('applicant').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries=>{
            res.json(entries[0]);
        })
        .catch(err=>{
            res.status(400).json("unable to get entries !")
            
        })
}
module.exports={
    handelImage,
    handelApi
}