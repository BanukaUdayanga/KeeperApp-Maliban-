import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 3000;

// Connect to database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "perntodo",
  password: "Bh262919",
  port: 5432,
});
db.connect();

// Midleware
app.use(cors());
app.use(express.json()); // req.body

// Create Work
app.post("/works", async (req, res) => {
  try {
    const { work } = req.body;
    const newWork = await db.query(
      "INSERT INTO workouts (work, created_at) VALUES($1, $2) RETURNING *",
      [work, new Date()]
    );

    res.json(newWork.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get All Works
app.get("/works", async (req, res) => {
  try {
    const allWorks = await db.query("SELECT * FROM workouts");
    res.json(allWorks.rows);
  } catch (error) {
    console.error(error);
  }
});

// Get Specific Work
app.get("/works/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const work = await db.query("SELECT * FROM workouts WHERE id = $1", [id]);
    res.json(work.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// Update Work
app.put("/works/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { work } = req.body;
    const updateWork = await db.query(
      "UPDATE workouts SET work = $1 WHERE id = $2",
      [work, id]
    );
    res.json("work was updated");
  } catch (error) {
    console.error(error);
  }
});

// Delete Works
app.delete("/works/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletework = await db.query("DELETE FROM workouts WHERE id = $1", [
      id,
    ]);

    res.json("Work was deleted");
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server Start on Port ${port}`);
});
