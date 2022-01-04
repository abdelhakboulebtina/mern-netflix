const router=require("express").Router();
const List=require("../models/List");
const verify =require("../verifyToken")
//Create
router.post("/",verify,async()=>{
    if(req.user.isAdmin){
       const newList=new List(req.body)
       try{
        const savedList=await newList.save()
        res.status(201).json(savedList); 
       }catch(err){
           res.status(500).json(err);   
       }
    }else{
        res.status(400).json("You are not allowed!")
    }
})
//Delete
router.delete("/",verify,async()=>{
    if(req.user.isAdmin){
       try{
        await List.findByIdAndDelete(req.params.id)
        res.status(201).json("the list has been deleted"); 
       }catch(err){
           res.status(500).json(err);   
       }
    }else{
        res.status(400).json("You are not allowed!")
    }
})
//GET
router.get("/",verify,async(req,res)=>{
    const typeQuery=req.query.type;
    const genreQuery=req.query.genre;
    let list=[];
    try{
        if(typeQuery){
            if(genreQuery){
                list=await list.aggregate([
                    {$match:{type:typeQuery,genre:genreQuery}},
                    {$sample:{size:10}}])
            }else{
                list=await list.aggregate([
                    {$match:{type:typeQuery}},
                    {$sample:{size:10}}]);
            }
        }
        else{
            list=await list.aggregate([{$sample:{size:10}}])
        }
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports=router;