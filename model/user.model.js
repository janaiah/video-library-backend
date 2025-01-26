const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Mobile: {
        type: String,
        required: true
    }

},
{
    timestamps: true
}

)
const User = mongoose.model('tblusers', UserSchema);
module.exports = User;

