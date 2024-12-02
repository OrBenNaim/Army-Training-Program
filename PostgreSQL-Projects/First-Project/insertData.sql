-- Insert data into the 'books' table
INSERT INTO books(title, author_id, publisher, publisher_date)
VALUES 
('The Adventures of SQL', 1, 'Tech Books Publishing', '2024-01-15'),
('Historical Insights', 2, 'History Makers Ltd.', '2023-11-20');


-- Insert data into the 'authors' table
INSERT INTO authors (name, bio)
VALUES 
('John Doe', 'John is a prolific writer of fiction.'),
('Jane Smith', 'Jane specializes in historical biographies.');
