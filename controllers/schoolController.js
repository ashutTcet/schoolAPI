exports.addSchool = (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, address, latitude, longitude } = req.body;

    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, address, latitude, longitude], (err, result) => {
      if (err) {
        console.error("SQL ERROR:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.json({ message: "Success" });
    });

  } catch (error) {
    console.error("CRASH ERROR:", error);
    res.status(500).json({ message: "Server crash", error });
  }
};
