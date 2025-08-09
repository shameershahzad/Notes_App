const express = require("express")
const notesModel = require("../Model/notesModel")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.post("/addNotes",verifyToken,(req,res) => {
    const {title,body,tag} = req.body;
    notesModel.create({title,body,tag,userId:req.userId})
    .then(result =>  res.status(200).json({message:"Notes Added!",result}))
      .catch(err => res.status(500).json(err));
})

router.get("/home",verifyToken,(req,res) => {
    notesModel.find({userId:req.userId})
    .then(notes => res.json({message:"Notes Found",notes}))
    .catch(err => res.status(500).json(err))
})  

router.delete("/deleteNotes/:id",verifyToken,(req,res) => {
    notesModel.findOneAndDelete({_id:req.params.id,userId:req.userId})
    .then(deleted => res.status(200).json({message:"Notes deleted!", deleted}))
    .catch(err => res.status(404).json(err))
})

router.get("/editNotes/:id",verifyToken,(req,res) => {
    const {id} = req.params;
    notesModel.findById(id)
    .then(result => {
        if(!result){
            return res.status(200).json({message:"No notes found!"})
        }
       res.json(result)
    }
    )
    .catch(err => res.status(500).json(err))

})

router.put("/editNotes/:id",verifyToken,(req,res) => {
    notesModel.findOneAndUpdate(
    {_id:req.params.id,userId:req.userId},  // filter
    { title: req.body.title, body: req.body.body, tag: req.body.tag }
    ) // update)
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json(err))
})


module.exports = router;