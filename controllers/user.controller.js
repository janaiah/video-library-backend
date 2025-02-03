const User=require('../model/user.model.js');

const getUsers=async (req, res) => {
    try {
      const users = await User.find({});
      console.log(users);
      res.status(200).json(users);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
      res.end();
    }
  };

 const getUserById=async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.find({ UserId: id });
      console.log(user);
      res.status(200).json(user);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
      res.end();
    }
  };
  const addUser=async (req, res) => {
    const { UserId, UserName, Password, Email, Mobile,Role } = req.body;
    try {
      const user = await User.create(req.body);
      console.log(user);
      res.status(200).json(user);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
      res.end();
    }
  };
const updateUser=async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOneAndUpdate({ UserId: id }, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await User.find({ UserId: id });
      res.status(200).json(updatedUser);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
      res.end();
    }
  };
const deleteUser=async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOneAndDelete({ UserId: id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: `User ${id} has been deleted successfully  ` });
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
      res.end();
    }
  };
 module.exports={getUsers,getUserById,addUser,updateUser,deleteUser}
 