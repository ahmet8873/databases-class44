const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const query1 = `
  SELECT a.author_name AS author, m.author_name AS mentor
  FROM authors a
  LEFT JOIN authors m ON a.mentor = m.author_id`;

const query2 = `
  SELECT a.*, rp.paper_title
  FROM authors a
  LEFT JOIN author_paper ap ON a.author_id = ap.author_id
  LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id`;

connection.query(query1, (err, results) => {
  if (err) {
    console.error("Error executing query 1:", err);
  } else {
    console.log("Query 1 Results:");
    console.table(results);
  }
});

connection.query(query2, (err, results) => {
  if (err) {
    console.error("Error executing query 2:", err);
  } else {
    console.log("Query 2 Results:");
    console.table(results);
  }

  connection.end();
});
