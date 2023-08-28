const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

const insertAuthorsQuery = `
  INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES
  (1, 'Author 1', 'University 1', '1990-01-01', 10, 'Male', NULL),
  (2, 'Author 2', 'University 2', '1988-05-15', 8, 'Female', 1),
  (3, 'Author 3', 'University 3', '1992-03-20', 6, 'Male', 1),
  (4, 'Author 4', 'University 4', '1985-09-10', 9, 'Male', 2),
  (5, 'Author 5', 'University 5', '1991-06-25', 7, 'Female', 2),
  (6, 'Author 6', 'University 6', '1987-03-12', 5, 'Male', 1),
  (7, 'Author 7', 'University 7', '1993-08-18', 7, 'Female', 4),
  (8, 'Author 8', 'University 8', '1984-11-30', 8, 'Male', 3),
  (9, 'Author 9', 'University 9', '1990-04-22', 6, 'Female', 2),
  (10, 'Author 10', 'University 10', '1989-02-14', 9, 'Male', 5),
  (11, 'Author 11', 'University 11', '1986-07-08', 7, 'Female', 7),
  (12, 'Author 12', 'University 12', '1994-10-03', 5, 'Male', 5),
  (13, 'Author 13', 'University 13', '1983-12-17', 8, 'Female', 4),
  (14, 'Author 14', 'University 14', '1982-09-30', 9, 'Female', 3),
  (15, 'Author 15', 'University 15', '1985-05-10', 7, 'Female', 1)
`;

const insertPapersQuery = `
  INSERT INTO research_papers (paper_id, paper_title, conference, publish_date)
  VALUES
  (1, 'Paper Title 1', 'Conference 1', '2023-01-15'),
  (2, 'Paper Title 2', 'Conference 2', '2023-02-20'),
  (3, 'Paper Title 3', 'Conference 3', '2022-12-10'),
  (4, 'Paper Title 4', 'Conference 4', '2022-11-05'),
  (5, 'Paper Title 5', 'Conference 5', '2021-08-30'),
  (6, 'Paper Title 6', 'Conference 6', '2021-06-22'),
  (7, 'Paper Title 7', 'Conference 7', '2020-10-18'),
  (8, 'Paper Title 8', 'Conference 8', '2020-09-03'),
  (9, 'Paper Title 9', 'Conference 9', '2019-12-25'),
  (10, 'Paper Title 10', 'Conference 10', '2019-11-15'),
  (11, 'Paper Title 11', 'Conference 1', '2018-04-12'),
  (12, 'Paper Title 12', 'Conference 2', '2017-07-30'),
  (13, 'Paper Title 13', 'Conference 3', '2016-11-22'),
  (14, 'Paper Title 14', 'Conference 4', '2016-09-15'),
  (15, 'Paper Title 15', 'Conference 5', '2015-12-05'),
  (16, 'Paper Title 16', 'Conference 6', '2014-08-18'),
  (17, 'Paper Title 17', 'Conference 7', '2013-10-28'),
  (18, 'Paper Title 18', 'Conference 8', '2013-05-01'),
  (19, 'Paper Title 19', 'Conference 9', '2012-03-15'),
  (20, 'Paper Title 20', 'Conference 10', '2012-01-10'),
  (21, 'Paper Title 21', 'Conference 1', '2011-09-22'),
  (22, 'Paper Title 22', 'Conference 2', '2010-07-09'),
  (23, 'Paper Title 23', 'Conference 3', '2010-02-14'),
  (24, 'Paper Title 24', 'Conference 4', '2009-12-03'),
  (25, 'Paper Title 25', 'Conference 5', '2008-08-26'),
  (26, 'Paper Title 26', 'Conference 6', '2007-06-17'),
  (27, 'Paper Title 27', 'Conference 7', '2007-03-28'),
  (28, 'Paper Title 28', 'Conference 8', '2006-11-10'),
  (29, 'Paper Title 29', 'Conference 9', '2005-09-20'),
  (30, 'Paper Title 30', 'Conference 10', '2005-04-01')
`;

const insertAuthorPaperQuery = `
  INSERT INTO author_paper (author_id, paper_id)
  VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 3),
  (3, 4),
  (4, 5),
  (5, 6),
  (6, 7),
  (7, 8),
  (8, 9),
  (8, 10),
  (9, 11),
  (9, 12),
  (10, 13),
  (10, 14),
  (11, 15),
  (11, 16),
  (12, 17),
  (12, 18),
  (13, 19),
  (13, 20),
  (14, 21),
  (14, 22),
  (15, 23),
  (15, 24),
  (15, 25),
  (15, 26),
  (15, 27),
  (15, 28),
  (15, 29),
  (15, 30)
`;

connection.query(
  `
    CREATE TABLE research_papers (
        paper_id INT PRIMARY KEY,
        paper_title VARCHAR(200),
        conference VARCHAR(100),
        publish_date DATE
    )`,
  (err, results) => {
    if (err) {
      console.error("Error creating research_papers table:", err);
      connection.end();
      return;
    }

    connection.query(
      `
        CREATE TABLE author_paper (
            author_id INT,
            paper_id INT,
            PRIMARY KEY (author_id, paper_id),
            FOREIGN KEY (author_id) REFERENCES authors(author_id),
            FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
        )`,
      (err, results) => {
        if (err) {
          console.error("Error creating author_paper table:", err);
        } else {
          console.log(
            "research_papers and author_paper tables created successfully."
          );

          connection.query(insertAuthorsQuery, (err, results) => {
            if (err) {
              console.error("Error inserting authors:", err);
              connection.end();
            } else {
              console.log("Authors inserted successfully.");

              connection.query(insertPapersQuery, (err, results) => {
                if (err) {
                  console.error("Error inserting research papers:", err);
                  connection.end();
                } else {
                  console.log("Research papers inserted successfully.");

                  connection.query(insertAuthorPaperQuery, (err, results) => {
                    if (err) {
                      console.error(
                        "Error inserting author-paper relationships:",
                        err
                      );
                    } else {
                      console.log(
                        "Author-paper relationships inserted successfully."
                      );
                    }

                    connection.end();
                  });
                }
              });
            }
          });
        }

        connection.end();
      }
    );
  }
);
