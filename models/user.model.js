const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    studentCode: {
        type: String,
        require: [true, "Student code is required"],
    },
    class: {
        type: String,
        require: [true, "Class is required"],
    },
    point: Number,
    comment:String,
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);