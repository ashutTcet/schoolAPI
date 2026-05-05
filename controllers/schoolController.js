exports.addSchool = (req, res) => {
  // Safety check (prevents crash if body missing)
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { name, address, latitude, longitude } = req.body;

  // Validation
  if ( !name || !address || latitude == null || longitude == null) {
    return res.status(400).json({
      message: "All fields (id, name, address, latitude, longitude) are required"
    });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      message: "Latitude and Longitude must be numbers"
    });
  }

  const query = `
    INSERT INTO schools (id, name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [id, name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId
    });
  });
};


// ➤ List Schools API
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  // Validation
  if (!latitude || !longitude) {
    return res.status(400).json({
      message: "User latitude and longitude are required"
    });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      message: "Invalid coordinates"
    });
  }

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // Add distance & sort
    const sortedSchools = results
      .map((school) => {
        const distance = getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2)) // rounded to 2 decimals
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json({
      count: sortedSchools.length,
      schools: sortedSchools
    });
  });
};