-- List all books written by a specific author:
-- SELECT authors.name AS author_name, books.title, books.publisher, books.publisher_date
-- FROM books
-- INNER JOIN authors ON books.author_id = authors.id
-- WHERE authors.name = 'J.K. Rowling';


-- List all borrowers who have borrowerd a specific book:
SELECT books.title AS book_name, borrowers.name AS borrower_name, borrowers.email, loans.loan_date, loans.return_date
FROM loans
INNER JOIN borrowers ON loans.borrower_id = borrowers.id
INNER JOIN books ON loans.book_id = books.id
WHERE books.title = 'Harry Potter and the Sorcerer''s Stone';
