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

  // Create volunteers table with updated schema to match frontend
  db.run(
    `
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip TEXT NOT NULL,
      skills TEXT NOT NULL,
      availability TEXT NOT NULL,
      experience TEXT,
      interests TEXT NOT NULL,
      referral TEXT NOT NULL,
      emergencyContact TEXT NOT NULL,
      emergencyPhone TEXT NOT NULL
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
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phone: "555-0123",
            address: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            skills: JSON.stringify(["Teaching", "Technology"]),
            availability: JSON.stringify([
              "Weekday mornings",
              "Weekend afternoons",
            ]),
            experience: "5 years of teaching experience",
            interests: "Education and technology outreach programs",
            referral: "Website",
            emergencyContact: "Jane Doe",
            emergencyPhone: "555-0124",
          };

          db.run(
            `
          INSERT INTO volunteers (firstName, lastName, email, phone, address, city, state, zip, skills, availability, experience, interests, referral, emergencyContact, emergencyPhone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [
              sampleVolunteer.firstName,
              sampleVolunteer.lastName,
              sampleVolunteer.email,
              sampleVolunteer.phone,
              sampleVolunteer.address,
              sampleVolunteer.city,
              sampleVolunteer.state,
              sampleVolunteer.zip,
              sampleVolunteer.skills,
              sampleVolunteer.availability,
              sampleVolunteer.experience,
              sampleVolunteer.interests,
              sampleVolunteer.referral,
              sampleVolunteer.emergencyContact,
              sampleVolunteer.emergencyPhone,
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
