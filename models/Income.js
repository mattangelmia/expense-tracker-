const mongoose = require('mongoose');

const IncomeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


    monthlyIncome: {
        type: Number,
        required: true,
    },





})

module.exports = mongoose.model('Income', IncomeSchema);