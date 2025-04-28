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

  // Create volunteers table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      skills TEXT NOT NULL,
      availability TEXT NOT NULL,
      phone TEXT,
      experience TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err);
        return;
      }
      console.log("Volunteers table created successfully.");

      // Check if the table is empty
      db.get("SELECT COUNT(*) as count FROM volunteers", (err, row) => {
        if (err) {
          console.error("Error checking table:", err);
          return;
        }

        // If the table is empty, insert sample data
        if (row.count === 0) {
          const sampleVolunteer = {
            name: "John Doe",
            email: "john@example.com",
            skills: JSON.stringify(["Teaching", "Technology"]),
            availability: JSON.stringify([
              "Weekday mornings",
              "Weekend afternoons",
            ]),
            phone: "555-0123",
            experience: "5 years of teaching experience",
          };

          db.run(
            `
          INSERT INTO volunteers (name, email, skills, availability, phone, experience)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
            [
              sampleVolunteer.name,
              sampleVolunteer.email,
              sampleVolunteer.skills,
              sampleVolunteer.availability,
              sampleVolunteer.phone,
              sampleVolunteer.experience,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting sample data:", err);
                return;
              }
              console.log("Sample volunteer data inserted successfully.");
            }
          );
        }
      });
    }
  );
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing database:", err);
    return;
  }
  console.log("Database connection closed.");
});
