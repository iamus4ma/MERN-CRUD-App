const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://iamus4ma:iamus4ma@cluster0.taukuap.mongodb.net/food?retryWrites=true&w=majority"
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({
    foodName: foodName,
    daysSinceIAte: days,
  });
  try {
    await food.save();
    res.send("Food was saved successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving food.");
  }
});

app.get("/read", async (req, res) => {
  try {
    const result = await FoodModel.find({}).exec();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName });
    res.send("Food updated successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating food.");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FoodModel.findByIdAndDelete(id).exec();
    res.send("deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting food.");
  }
});

app.listen(3001, () => {
  console.log("Server Running on port 3001...");
});
