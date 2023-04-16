import mongoose from 'mongoose'

const NotifySchema = mongoose.Schema({
    endpoint: {
      type: String,
      required:true
    },
    expirationTime: {
      type: Number,
    },
    keys: {
      type: Object,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", NotifySchema);