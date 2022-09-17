import mongoose from "mongoose";

type MobilePhoneLine = {
  phoneNumber: string;
  location: any;
};

const phoneLineSchema = new mongoose.Schema<MobilePhoneLine>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const phoneLineModel = mongoose.model("phoneNumber", phoneLineSchema);

export default phoneLineModel;
