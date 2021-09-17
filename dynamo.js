const aws = require("aws-sdk");

require("dotenv").config();

aws.config.update({
  region: process.env.AWS_REGION,
});

const dynamoClient = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = "harrypotter";

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const characters = await dynamoClient.scan(params).promise();
  return characters;
};

const addOrUpdateCharacter = async character => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };

  await dynamoClient.put(params).promise();
};

const getCharacterById = async id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  return await dynamoClient.get(params).promise();
};

const deleteCharacter = async id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getCharacters,
  addOrUpdateCharacter,
  getCharacterById,
  deleteCharacter,
};
