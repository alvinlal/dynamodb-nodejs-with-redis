const axios = require("axios");
const { addOrUpdateCharacter } = require("./dynamo");

const seedData = async () => {
  const url = "https://hp-api.herokuapp.com/api/characters";

  try {
    const { data: characters } = await axios.get(url);
    const characterPromises = characters.map((character, i) => addOrUpdateCharacter({ ...character, id: i + "" }));

    await Promise.all(characterPromises);
  } catch (error) {
    console.log(error);
  }
};

seedData();
