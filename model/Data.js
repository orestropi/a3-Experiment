const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    participantID: {
        type: String,
        required: true,
        max: 1024,
    },
    trialN:{
        type: String,
        max: 1024,
    },
    chartType:{
        type: String,
        max: 1024,
    },
    actualPercent:{
        type: String,
        max: 1024,
    },
    enteredPercent:{
        type: String,
        max: 1024,
    },
    error:{
        type: String,
        max: 1024,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Data', userDataSchema);