const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create a database file in the db directory
const dbPath = path.resolve(__dirname, "volunteers.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
    return;
  }
  console.log("Connected to the SQLite database.");
});

// Helper function to run SQL queries with promises
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error("Error running sql: " + sql);
        console.error(err);
        reject(err);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Helper function to get a single row
const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        console.error("Error running sql: " + sql);
        console.error(err);
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};

// Helper function to get multiple rows
const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Error running sql: " + sql);
        console.error(err);
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

// Database operations for volunteers
const volunteersDb = {
  // Get all volunteers
  getAll: async () => {
    const rows = await all("SELECT * FROM volunteers");
    return rows.map((row) => ({
      ...row,
      skills: JSON.parse(row.skills),
      availability: JSON.parse(row.availability),
    }));
  },

  // Get volunteers by skill
  getBySkill: async (skill) => {
    const rows = await all("SELECT * FROM volunteers");
    return rows
      .map((row) => ({
        ...row,
        skills: JSON.parse(row.skills),
        availability: JSON.parse(row.availability),
      }))
      .filter((volunteer) => volunteer.skills.includes(skill));
  },

  // Get volunteers by availability
  getByAvailability: async (availability) => {
    const rows = await all("SELECT * FROM volunteers");
    return rows
      .map((row) => ({
        ...row,
        skills: JSON.parse(row.skills),
        availability: JSON.parse(row.availability),
      }))
      .filter((volunteer) => volunteer.availability.includes(availability));
  },

  // Get a volunteer by ID
  getById: async (id) => {
    const row = await get("SELECT * FROM volunteers WHERE id = ?", [id]);
    if (!row) return null;

    return {
      ...row,
      skills: JSON.parse(row.skills),
      availability: JSON.parse(row.availability),
    };
  },

  // Create a new volunteer
  create: async (volunteer) => {
    const { name, email, skills, availability, phone, experience } = volunteer;
    const result = await run(
      "INSERT INTO volunteers (name, email, skills, availability, phone, experience) VALUES (?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        JSON.stringify(skills),
        JSON.stringify(availability),
        phone,
        experience,
      ]
    );
    return result.id;
  },

  // Update a volunteer
  update: async (id, volunteer) => {
    const { name, email, skills, availability, phone, experience } = volunteer;
    await run(
      "UPDATE volunteers SET name = ?, email = ?, skills = ?, availability = ?, phone = ?, experience = ? WHERE id = ?",
      [
        name,
        email,
        JSON.stringify(skills),
        JSON.stringify(availability),
        phone,
        experience,
        id,
      ]
    );
    return true;
  },

  // Delete a volunteer
  delete: async (id) => {
    await run("DELETE FROM volunteers WHERE id = ?", [id]);
    return true;
  },
};

module.exports = {
  db,
  run,
  get,
  all,
  volunteersDb,
};
