const Category = require("../model/category.model.js");
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories) {
      res.status(200).json(categories);
      res.end();
    } else {
      res.status(404).json({ message: "No categories found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (category) {
      console.log(id);
      console.log(category);
      res.status(200).json(category);
      res.end();
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};
const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (category) {
      res.status(201).json(category);
      res.end();
    } else {
      res.status(400).json({ message: "Category not created" });
      res.end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};

const updateCategory=async(req,res)=>{
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body);
        if(!category)
        {
            return res.status(404).json({ message: "Category not found" });
        }
        const updatedCategory=await Category.findById(id);
        res.status(200).json(updatedCategory);
        res.end();

        
    }catch(error){
        res.status(500).json({ message: error.message });
        res.end();
    }
}
const deleteCategory=async(req,res)=>{
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category)
        {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted" });
        res.end();

    }catch(error){
        res.status(500).json({ message: error.message });
        res.end();
    }
}

module.exports = { getCategories, getCategoryById, addCategory,updateCategory,deleteCategory };
