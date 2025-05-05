const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema({
    f_name: String,
    l_name: String, 
    username: String,
    password: String,
    email: String,
    blacklist: [String],
    whitelist: [String],
    greylist: [String],
    toDoLists: [String],
    toDoList: Boolean,
    blackOrWhite: Boolean
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
