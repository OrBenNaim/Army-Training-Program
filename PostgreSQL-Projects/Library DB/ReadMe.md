# Library DB - PostgreSQL Project

## Description
Library-DB is a PostgreSQL-based database project designed to manage a library system. The project includes comprehensive tables and queries for handling books, authors, borrowers, and loans. Key features include tracking book loans, managing borrower information, and identifying overdue or currently loaned books.

## Features
- **Authors Management**: Store details about authors, including their name and biography.
- **Books Management**: Track book titles, their authors, publishers, and publication dates.
- **Borrower Management**: Maintain a list of library borrowers with their names and contact details.
- **Loan Management**: Record book loans, including loan and return dates.
Cascade Deletion: Automatically delete associated records (e.g., loans) when an author or book is removed.
- **Query Examples**:
- List all books by a specific author.
- Find borrowers of a specific book.
- Identify overdue loans.
- Track all books currently on loan.