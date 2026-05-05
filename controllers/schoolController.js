const supabase = require('../config/db');
const getDistance = require('../utils/distance');

// ➤ Add School
exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({ message: "All fields required" });
    }

    const { data, error } = await supabase
      .from('schools')
      .insert([
        { name, address, latitude, longitude }
      ])
      .select();

    if (error) {
      console.error("Insert Error:", error);
      return res.status(500).json({ message: "Database error", error });
    }

    res.status(201).json({
      message: "School added successfully",
      data
    });

  } catch (err) {
    console.error("Crash:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ➤ List Schools
exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Coordinates required" });
    }

    const { data, error } = await supabase
      .from('schools')
      .select('*');

    if (error) {
      console.error("Fetch Error:", error);
      return res.status(500).json({ message: "Database error" });
    }

    const sorted = data
      .map((school) => {
        const distance = getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2))
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json({
      count: sorted.length,
      schools: sorted
    });

  } catch (err) {
    console.error("Crash:", err);
    res.status(500).json({ message: "Server error" });
  }
};