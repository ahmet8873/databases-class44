async function getTotalPopulationByYearForCountry(db, country) {
  try {
    const collection = db.collection("countries");

    const pipeline = [
      {
        $match: {
          Country: country,
        },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: { $add: ["$M", "$F"] },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    return result;
  } catch (err) {
    console.error("Error getting total population:", err);
    return [];
  }
}

module.exports = { getTotalPopulationByYearForCountry };
