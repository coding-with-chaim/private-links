const serverless = require("serverless-http");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/link", async (req, res) => {
  const params = {
    TableName: 'linksTable',
    Item: {
      linkId: uuid(),
      contents: req.body.contents,
      createdAt: Date.now()
    }
  };
  try {
    await db.put(params).promise();
    const link = `${process.env.CLIENT_URL}/${params.Item.linkId}`;
    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/link/:linkid", async (req, res) => {
  const params = {
    TableName: 'linksTable',
    Key: {
      linkId: req.params.linkid,
    },
  };

  try {
    const linkContents = await db.get(params).promise();
    if (linkContents.Item) {
      const deleteParams = {
        TableName: "linksTable",
        Key: {
          linkId: req.params.linkid
        }
      };
      await db.delete(deleteParams).promise();
      res.status(200).json({ contents: linkContents.Item.contents });
    } else {
      res.status(404).json({ message: "nothing to see here" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

});

module.exports.app = serverless(app);