const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = { id: Date.now(), text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log("Backend działa na porcie 5000");
});
