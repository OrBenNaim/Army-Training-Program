-- List all books written by a specific author:
SELECT authors.name AS author_name, books.title, books.publisher, books.publisher_date
FROM books
INNER JOIN authors ON books.author_id = authors.id
WHERE authors.name = 'J.K. Rowling';


-- List all borrowers who have borrowerd a specific book:
-- SELECT books.title AS book_name, borrowers.name AS borrower_name, borrowers.email, loans.loan_date, loans.return_date
-- FROM loans
-- INNER JOIN borrowers ON loans.borrower_id = borrowers.id
-- INNER JOIN books ON loans.book_id = books.id
-- WHERE books.title = 'Harry Potter and the Sorcerer''s Stone';



-- List all books that are currently on loan:
-- SELECT books.title AS book_name, books.publisher AS publisher, borrowers.name AS borrower_name, borrowers.email AS borrower_email, loans.loan_date, loans.return_date
-- FROM loans
-- INNER JOIN books ON loans.book_id = books.id
-- INNER JOIN borrowers ON loans.borrower_id = borrowers.id
-- WHERE loans.return_date IS NULL;


-- List all books that are overdue (return date has passed):
-- SELECT 
-- 	books.title AS book_name,
-- 	books.publisher AS publisher, 
-- 	borrowers.name AS borrower_name, 
-- 	CURRENT_DATE, loans.return_date
-- FROM 
-- 	loans
-- INNER JOIN books ON loans.book_id = books.id
-- INNER JOIN borrowers ON loans.borrower_id = borrowers.id
-- WHERE loans.return_date < CURRENT_DATE;		-- Check if the return_date is before today