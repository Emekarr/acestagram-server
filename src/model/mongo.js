const mongoose = require("mongoose");

//connect to a database
module.exports = () => {
  mongoose.connect("mongodb://localhost/acestagram_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
