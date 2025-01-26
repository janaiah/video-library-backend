const mongoose=require("mongoose");
const CategorySchema=new mongoose.Schema({
    CategoryId:{
        type:String,
        required:true
    },
    CategoryName:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)
const Category=mongoose.model("Category",CategorySchema);
module.exports=Category;