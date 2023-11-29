const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://me94110:${process.env.MONGO_PASSWORD}@cluster0.pldw0v1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connexion ok !");
  })
  .catch((err) => {
    console.log(err);
  });
