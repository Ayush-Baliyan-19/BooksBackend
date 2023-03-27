const mongoose=require("mongoose")

const BookSchema= new mongoose.Schema(
    {
        id:{
            type:String,
            required:true
        },
        Title:{
            type:String,
            required:true
        },
        Description:{
            type:String,
            required:true
        },
        Author:{
            type:String,
            required:true
        },
        PublishedDate:{
            type:String,
            required:true
        },
    }
)

const Books = mongoose.model('Books', BookSchema)

module.exports= Books