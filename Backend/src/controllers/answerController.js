const { answerModel } = require("../models/answerModel");
const questionModel = require("../models/questionModel");


module.exports.createAnswer  = async(req,res)=>{
    try{
         const{body} = req.body;
         const { questionId } = req.params;
         if(!body) return res.status(400).json({message:'Answer body is required'})
        const question = await questionModel.findById(questionId);
        if(!question) return res.status(404).json({message:'Question not found'})
        const answer = await answerModel.create({body, questionId , authorId : req.user.id});
     res.status(200).json({message:'Answer created successfully', answer})


    }catch(err){
        res.status(400).json({message:err.message})
    }

}