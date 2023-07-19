const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "please add user_id"],
    unique: true,
  },
  date: {
    type: Date,
    required: [true, "please add Date"]
  },
  punches: [
    {
      type: {
        type: String,
        enum: ['punch-in', 'punch-out', 'meal-in', 'meal-out', 'tea-break-in', 'tea-break-out', 'overtime'],
        required: [true, "please add the punch type"]
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Custom validator to check for duplicates in the punches 

attendanceSchema.path('punches').validate(function (punches) {
  const uniqueTypes = new Set();
  for (const punch of punches) {
    if (uniqueTypes.has(punch.type)) {
      return false; 
    }
    uniqueTypes.add(punch.type);
  }
  return true; 
}, 'Duplicate punch type found in punches array.');

module.exports = mongoose.model('Attendance', attendanceSchema);
