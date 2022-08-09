import mongoose from "mongoose";

type Number = {
  phoneNumber: string;
  location: any;
};

const phoneSchema = new mongoose.Schema<Number>(
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
const Telephone = mongoose.model("phoneNumber", phoneSchema);

export default Telephone;
