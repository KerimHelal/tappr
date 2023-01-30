const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodesSchema = new Schema({
    code: {
        type: String,
        required: [true, 'The qr code field is required'],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Codes = mongoose.model('codes', CodesSchema);

module.exports = Codes;
