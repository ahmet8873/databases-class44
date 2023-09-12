const { MongoClient } = require("mongodb");
const fs = require("fs");
const { getTotalPopulationByYearForCountry } = require("./populationQuery.js");
const { getContinentDataByYearAndAge } = require("./getContinentData.js");

const url =
  "mongodb+srv://ahmetavci:272034mongo@ahmetavci.nw7zyjo.mongodb.net/?retryWrites=true&w=majority";

const dbName = "databaseWeek4";
const collectionName = "countries";

const client = new MongoClient(url);

async function createDatabaseAndCollection() {
  try {
    await client.connect();

    const db = client.db(dbName);

    // Check if the collection already exists
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (coll) => coll.name === collectionName
    );

    if (!collectionExists) {
      await db.createCollection(collectionName);
      console.log(
        `Collection "${collectionName}" created successfully in database "${dbName}"`
      );
    } else {
      console.log(
        `Collection "${collectionName}" already exists in database "${dbName}"`
      );
    }

    // csv to database
    await importCSVData(db);

    // Usage of the imported function totalPopulationByYear
    const country = "Netherlands";
    const totalPopulationByYear = await getTotalPopulationByYearForCountry(
      db,
      country
    );
    console.log("Total Population by Year for", country, totalPopulationByYear);

    // continent data  usage
    const year = 2020;
    const age = "100+";

    const continentData = await getContinentDataByYearAndAge(db, year, age);

    console.log("Continent Data for Year", year, "and Age", age, continentData);
  } catch (err) {
    console.error("Error creating database and collection:", err);
  } finally {
    client.close();
  }
}

async function importCSVData(db) {
  try {
    const csvData = fs.readFileSync("population_pyramid_1950-2022.csv", "utf8");

    // Split the CSV data into rows
    const csvRows = csvData.trim().split("\n");

    // Define an array to hold the data
    const data = [];

    // Iterate over each row and parse it
    for (const row of csvRows) {
      const [Country, Year, Age, M, F] = row.split(",");
      data.push({
        Country: Country.trim(),
        Year: parseInt(Year.trim(), 10),
        Age: Age.trim(),
        M: parseInt(M.trim(), 10),
        F: parseInt(F.trim(), 10),
      });
    }

    // Get a reference to the collection
    const collection = db.collection(collectionName);

    // Insert the data into the collection
    const result = await collection.insertMany(data);
    console.log(
      `Inserted ${result.insertedCount} documents into collection "${collectionName}"`
    );
  } catch (err) {
    console.error("Error importing data:", err);
  }
}

createDatabaseAndCollection();
