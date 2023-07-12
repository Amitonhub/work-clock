const mongoose = require('mongoose')

const PunchLogSchema = mongoose.Schema({
    UserId: { type: String, required: true },
    LogTime: { type: Date, required: true },
    Type: { type: String, required: true },
    InputType: { type: String, required: true },
    Temperature: { type: String, required: true },
    FaceMask: { type: Boolean, default: false }
});

const RealTimeSchema = new Schema({
    OperationID: { type: String, required: true },
    PunchLog: { type: PunchLogSchema, required: true },
    AuthToken: { type: String, required: true },
    Time: { type: Date, required: true }
});

module.exports = mongoose.model('RealTime', RealTimeSchema)
