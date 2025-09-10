import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gulsah_yigit:14081992Gy@cluster0.oaolhvy.mongodb.net/aporetik-blog"
  );
  console.log("DB Connected");
};
