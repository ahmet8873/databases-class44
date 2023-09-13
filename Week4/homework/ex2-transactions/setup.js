const connectToMongoDB = require("./db.js");

async function setup() {
  const db = await connectToMongoDB();

  const accounts = [
    {
      account_number: 101,
      balance: 5000.0,
      account_changes: [
        { change_number: 1, amount: 5000.0, remark: "Initial deposit" },
      ],
    },
    {
      account_number: 102,
      balance: 3000.0,
      account_changes: [
        { change_number: 1, amount: 3000.0, remark: "Initial deposit" },
      ],
    },
  ];

  await db.collection("accounts").insertMany(accounts);
  console.log("Sample data inserted into MongoDB");
}

setup().catch(console.error);
