const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

connection.query(
  `
    SELECT research_papers.paper_id, research_papers.paper_title, COUNT(author_paper.author_id) AS author_count
    FROM research_papers
    LEFT JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
    GROUP BY research_papers.paper_id
  `,
  (err, results) => {
    if (err) {
      console.error("Error fetching research papers and author counts:", err);
    } else {
      console.log("Research papers and author counts:");
      console.log(results);
    }
  }
);

connection.query(
  `
    SELECT SUM(research_papers.paper_id) AS total_papers
    FROM research_papers
    JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
    JOIN authors ON author_paper.author_id = authors.author_id
    WHERE authors.gender = 'Female'
  `,
  (err, results) => {
    if (err) {
      console.error(
        "Error calculating sum of research papers by female authors:",
        err
      );
    } else {
      console.log("Sum of research papers by female authors:");
      console.log(results);
    }
  }
);

connection.query(
  `
    SELECT university, AVG(h_index) AS average_h_index
    FROM authors
    GROUP BY university
  `,
  (err, results) => {
    if (err) {
      console.error("Error calculating average h-index per university:", err);
    } else {
      console.log("Average h-index per university:");
      console.log(results);
    }
  }
);

connection.query(
  `
    SELECT authors.university, SUM(research_papers.paper_id) AS total_papers
    FROM authors
    JOIN author_paper ON authors.author_id = author_paper.author_id
    JOIN research_papers ON author_paper.paper_id = research_papers.paper_id
    GROUP BY authors.university
  `,
  (err, results) => {
    if (err) {
      console.error(
        "Error calculating sum of research papers per university:",
        err
      );
    } else {
      console.log("Sum of research papers per university:");
      console.log(results);
    }
  }
);

connection.query(
  `
    SELECT authors.university, MIN(authors.h_index) AS min_h_index, MAX(authors.h_index) AS max_h_index
    FROM authors
    GROUP BY authors.university
  `,
  (err, results) => {
    if (err) {
      console.error(
        "Error calculating min and max h-index per university:",
        err
      );
    } else {
      console.log("Min and max h-index per university:");
      console.log(results);
    }

    connection.end();
  }
);
