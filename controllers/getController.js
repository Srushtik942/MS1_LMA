const { where } = require("sequelize");
const {Book} = require("../models");
const {ReadingList} = require("../models");

// searching books
const searchBooks = async(req,res)=>{
    try{
        const title = req.query.title;
        const author = req.query.author;

        const findBook = await Book.findOne({
            where:{title,author}
        })

        if(!findBook){
            return res.status(404).json({message:"No book found!"});
        }

        return res.status(200).json({books:findBook});

    }catch(error){
        return res.status(500).json({message:"Internal Server Error!",error: error.message});

    }
}

// Get the User's Reading List


const getUserByReadingList = async(req,res)=>{
    try{
        const userId = req.params.userId;

        if(!userId){
            res.status(400).json("Check your id again!");
        }

        const findReadingList = await ReadingList.findOne({
            where:{userId}
        })
        if(!findReadingList){
            res.status(404).json({  message: "User not found or no books in reading list"})
        }
        res.status(200).json({readingList:findReadingList});

    }catch(error){
        res.status(500).json({message:"Internal Server Error!",error:error.message});
    }
}

module.exports = {searchBooks,getUserByReadingList}