-- Insert data into the 'authors' table
INSERT INTO authors (name, bio) VALUES 
    ('J.K. Rowling', 'British author, best known for the Harry Potter series.'),
    ('George R.R. Martin', 'American novelist and short story writer, author of A Song of Ice and Fire.'),
    ('J.R.R. Tolkien', 'English writer, poet, and author of The Lord of the Rings.');

-- Insert data into the 'books' table
INSERT INTO books (title, author_id, publisher, publisher_date) VALUES
    ('Harry Potter and the Sorcerer''s Stone', 1, 'Bloomsbury', '1997-06-26'),
    ('Harry Potter and the Chamber of Secrets', 1, 'Bloomsbury', '1998-07-02'),
    ('A Game of Thrones', 2, 'Bantam Spectra', '1996-08-06'),
    ('A Clash of Kings', 2, 'Bantam Spectra', '1998-11-16'),
    ('The Hobbit', 3, 'George Allen & Unwin', '1937-09-21'),
    ('The Fellowship of the Ring', 3, 'George Allen & Unwin', '1954-07-29');

-- Insert data into the 'borrowers' table
INSERT INTO borrowers (name, email) VALUES
    ('Alice Smith', 'alice.smith@example.com'),
    ('Bob Johnson', 'bob.johnson@example.com'),
    ('Charlie Brown', 'charlie.brown@example.com');

-- Insert data into the 'loans' table
INSERT INTO loans (book_id, borrower_id, loan_date, return_date) VALUES
    (1, 1, '2024-01-01', '2024-01-10'),
    (4, 2, '2024-02-15', '2024-02-25'),
    (6, 3, '2024-03-05', NULL); -- NULL return_date means the book has not been returned yet
