const express = require("express");
const cors = require("cors");
const { volunteersDb } = require("./db/database");
const path = require("path");
const { exec } = require("child_process");

const app = express();

// Enable CORS for the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Initialize the database
const setupDb = () => {
  return new Promise((resolve, reject) => {
    const setupScript = path.join(__dirname, "db", "setup.js");
    exec(`node ${setupScript}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing setup script: ${error}`);
        reject(error);
        return;
      }
      console.log(`Database setup output: ${stdout}`);
      resolve();
    });
  });
};

// GET /api/volunteers
app.get("/api/volunteers", async (req, res) => {
  try {
    const { skill, availability } = req.query;

    let volunteers;

    if (skill) {
      volunteers = await volunteersDb.getBySkill(skill);
    } else if (availability) {
      volunteers = await volunteersDb.getByAvailability(availability);
    } else {
      volunteers = await volunteersDb.getAll();
    }

    res.json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/volunteers/:id
app.get("/api/volunteers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const volunteer = await volunteersDb.getById(id);

    if (!volunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/volunteers
app.post("/api/volunteers", async (req, res) => {
  try {
    const volunteer = req.body;

    // Validate required fields
    if (
      !volunteer.name ||
      !volunteer.email ||
      !volunteer.skills ||
      !volunteer.availability
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure skills and availability are arrays
    if (
      !Array.isArray(volunteer.skills) ||
      !Array.isArray(volunteer.availability)
    ) {
      return res
        .status(400)
        .json({ error: "Skills and availability must be arrays" });
    }

    const id = await volunteersDb.create(volunteer);
    const newVolunteer = await volunteersDb.getById(id);

    res.status(201).json(newVolunteer);
  } catch (error) {
    console.error("Error creating volunteer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/volunteers/:id
app.put("/api/volunteers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const volunteer = req.body;

    // Check if volunteer exists
    const existingVolunteer = await volunteersDb.getById(id);
    if (!existingVolunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    // Validate required fields
    if (
      !volunteer.name ||
      !volunteer.email ||
      !volunteer.skills ||
      !volunteer.availability
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure skills and availability are arrays
    if (
      !Array.isArray(volunteer.skills) ||
      !Array.isArray(volunteer.availability)
    ) {
      return res
        .status(400)
        .json({ error: "Skills and availability must be arrays" });
    }

    await volunteersDb.update(id, volunteer);
    const updatedVolunteer = await volunteersDb.getById(id);

    res.json(updatedVolunteer);
  } catch (error) {
    console.error("Error updating volunteer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/volunteers/:id
app.delete("/api/volunteers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Check if volunteer exists
    const existingVolunteer = await volunteersDb.getById(id);
    if (!existingVolunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    await volunteersDb.delete(id);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3002;

// Initialize the database and start the server
setupDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
