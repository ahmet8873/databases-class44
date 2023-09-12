async function getContinentDataByYearAndAge(db, year, age) {
  try {
    const collection = db.collection("countries");

    const pipeline = [
      {
        $match: {
          Year: year,
          Age: age,
        },
      },
      {
        $group: {
          _id: "$Country",
          Country: { $first: "$Country" },
          Year: { $first: "$Year" },
          Age: { $first: "$Age" },
          M: { $sum: "$M" },
          F: { $sum: "$F" },
          TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    return result;
  } catch (err) {
    console.error("Error getting continent data:", err);
    return [];
  }
}

module.exports = { getContinentDataByYearAndAge };
