const express = require("express");
const app = express();
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacter } = require("./dynamo");
const { cache, setCache } = require("./redis");

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (error) {
    console.log(error);
  }
});

app.get("/characters/:id", cache, async (req, res) => {
  const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    setCache(id, character);
    res.json(character);
  } catch (error) {
    console.log(error);
  }
});

app.post("/characters", async (req, res) => {
  const character = req.body;

  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (error) {
    console.log(error);
  }
});

app.put("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;

  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.json(updatedCharacter);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCharacter = await deleteCharacter(id);
    res.json(deletedCharacter);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
