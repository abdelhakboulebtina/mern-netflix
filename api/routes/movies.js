const router=require("express").Router();
const Movie=require("../models/Movie");
const verify =require("../verifyToken")
//Create
router.post("/",verify,async()=>{
    if(req.user.isAdmin){
       const newMovie=new Movie(req.body)
       try{
        const savedMovie=await newMovie.save()
        res.status(201).json(savedMovie); 
       }catch(err){
           res.status(500).json(err);   
       }
    }else{
        res.status(400).json("You are not allowed!")
    }
})
router.put("/:id",verify,async()=>{
    if(req.user.isAdmin){
       try{
        const updatedMovie=await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(savedMovie); 
       }catch(err){
           res.status(500).json(err);   
       }
    }else{
        res.status(400).json("You are not allowed!")
    }
})
//Delete
router.delete("/:id",verify,async()=>{
    if(req.user.isAdmin){
       try{
         Movie.findByIdAndDelete(req.params.id)
        res.status(200).json("the movie has been deleted ..."); 
       }catch(err){
           res.status(500).json(err);   
       }
    }else{
        res.status(400).json("You are not allowed!")
    }
})
//Get
router.get("/find/:id",verify,async()=>{

       try{
        const movie=await Movie.findById(req.parms.id)
        res.status(200).json(movie); 
       }catch(err){
           res.status(500).json(err);   
       }
   
})
//Get RANDOM
router.get("/random",verify,async()=>{
    const type=req.query.type
    let movie;
    try{
     if(type==="series"){
        movie=await Movie.aggregate([
            {$match:{isSeries:true}},
            {$sample:{size:1}}
        ] )
     }else{
        movie=await Movie.aggregate([
            {$match:{isSeries:false}},
            {$sample:{size:1}}
        ] )
     }
     res.status(200).json(movie) 
    }catch(err){
        res.status(500).json(err);   
    }

})
module.exports=router;