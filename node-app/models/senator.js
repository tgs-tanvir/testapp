const mongoose = require("mongoose");

const senatorSchema = new mongoose.Schema({
    senatorId  : String,
    name: String,
    
    state: String,
    party: { type: String, enum: ['democrat', 'independent', 'republican'] },
    photo: String,
    status: { type: String, enum: ['active', 'former'] }
});

module.exports = mongoose.model('senators', senatorSchema);
