const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow requests from the specified frontend origin
app.use(cors());
const dbURI = "mongodb+srv://sunil_0881:guxmBtQ8cbDVPoqn@cluster0.fsdthfp.mongodb.net/";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Parse incoming JSON data
app.use(express.json());

// Define a mongoose schema and model (e.g., User)
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  // Create a new user document
  const newUser = new User({ name, email });

  // Save the user to the database
  newUser.save((err, savedUser) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(savedUser);
  });
});

app.listen(6000, () => {
  console.log("Server started on port 6000");
});