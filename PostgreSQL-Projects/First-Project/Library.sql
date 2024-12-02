CREATE TABLE books (
  id SERIAL PRIMARY KEY (MD5(id)),
  title VARCHAR(255),
  author_id INT,
  publisher VARCHAR(255),
  publication_date VARCHAR(255),
);