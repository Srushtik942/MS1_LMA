const { where } = require("sequelize");
const { User } = require("../models");
const {Book} = require("../models");
const {ReadingList} = require("../models");
// adding users
const emailExist = async(email)=>{
    const user = await User.findOne({where:{email}});
    return user;
   }

const addUser = async(req,res)=>{
try{
   const {username, email} = req.body;

//    console.log(req.body);

   if(!username || !email){
    res.status(401).json("Please check your request body again!");
   };

   // checking email exist or not
  if(await emailExist(email)){
    return res.status(400).json("User already exists!");
  }

//   creating new user
   const newUser = await User.create({
    username,
    email
   });
//    console.log(newUser);

   return res.status(200).json({
    message:"User created successfully!",
    newUser

   })

}catch(error){
    return res.status(500).json({message:"Internal Server Error", error:error.message});
}
}

// adding new book
const addBook = async(req,res)=>{
    try{
        const {title, author, genre, publicationYear} = req.body;

        if(!title || !author || !genre || !publicationYear){
            res.status(401).json({message:"Book title and author are required"})
        }

        const newBook = await Book.create({
            title,
            author,
            genre,
            publicationYear
        });

        return res.status(200).json({message:"Book added successfully!",newBook});

    }catch(error){
        return res.status(500).json({message:"Internal Server Error",error: error.message});
    }
}

// managing reading list

const addToReadingList = async(req,res)=>{
    try{
        const {userId, bookId, status} = req.body;

        if(!userId || !bookId){
            return res.status(400).json({message:"Check your request body again!"});
        }

        const findUserId= await User.findByPk(userId)

        const findBookId = await Book.findByPk(bookId)

        if(!findUserId || !findBookId){
            return res.status(404).json({ message: "Invalid userId or book ID"});
        }

        const addStatus = await ReadingList.create({
            userId,
            bookId,
            status
        })

        return res.status(200).json({message:"Book added to reading list",addStatus});


    }catch(error){
        return res.status(500).json({message:"Internal Server error",error:error.message});
    }
}


// Update Book Detail

const updateBook = async(req,res)=>{
    try{
         const bookId = req.params.bookId;
         const {title, genre} = req.body;

        if(!bookId){
            return res.status(404).json({message: "Book not found"});
        }

        // console.log(findBook);

         await Book.update(
           {title,genre},
           {
           where:{id:bookId}
           }
        );
        const findBook = await Book.findByPk(bookId);

        res.status(200).json({
            message: "Book details updated successfully!",books:findBook
        });


    }catch(error){
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

//  Remove a Book from the Reading List

const removeBookFromReadingList = async(req,res)=>{
    try{
        const readingListId =  req.params.readingListid;

        const findreadingListId = await ReadingList.findByPk(readingListId);

        const removeReadingList = await ReadingList.destroy({
            where: {id: readingListId}
        })

        res.json(200).json({message: "Book removed from reading list"});

    }catch(error){
        res.status(500).json({message:"Internal Server Error!",error:error.message});
    }
}




module.exports = {addUser,addBook,addToReadingList, updateBook,removeBookFromReadingList}