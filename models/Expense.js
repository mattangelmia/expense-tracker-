const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


    expenseName: {
        type: String,
        required: true,
    },


    cost: {

        type: Number,
        required: true,


    }




})

module.exports = mongoose.model('Expense', ExpenseSchema);