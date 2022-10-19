const router = require("express").Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@randomuser.ovvbl1f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    client.connect();
    const studentsCollection = client.db("RandomUser").collection("students");

    router.get("/students", async (req, res) => {
      const query = {};
      const cursor = studentsCollection.find(query);
      const students = await cursor.toArray();
      res.status(200).send(students);
    });

    router.post("/students", async (req, res) => {
      const student = req.body;
      const result = await studentsCollection.insertOne(student);
      res.status(200).send(result);
    });

    router.put("/students/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const updatedStudent = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...updatedStudent,
        },
      };
      const result = await studentsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    router.delete("/students/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await studentsCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};
run().catch((err) => {
  console.log(err);
});

module.exports = router;
