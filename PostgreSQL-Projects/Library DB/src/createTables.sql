-- Create the 'authors' table
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,      -- Auto-incrementing primary key
    name VARCHAR(255) NOT NULL, -- Name of the author
    bio TEXT                    -- Short biography of the author
);



-- Create the 'books' table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing primary key
    title VARCHAR(255) NOT NULL,       -- Title of the book
    author_id INT NOT NULL,            -- Foreign key to 'authors.id'
    publisher VARCHAR(255),            -- Publisher name
    publisher_date DATE,               -- Date of publication
	
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id)
    ON DELETE CASCADE                  -- If an author is deleted, delete their books too
);


-- Create the 'borrowers' table
CREATE TABLE borrowers (
    id SERIAL PRIMARY KEY,      	-- Auto-incrementing primary key
    name VARCHAR(255) NOT NULL, 	-- Name of the borrow
    email VARCHAR(255) NOT NULL 	-- Email of the borrow
);


-- Create the 'loans' table
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,        	-- Auto-incrementing primary key
    book_id INT NOT NULL,        	-- Foreign key to 'book.id'
	borrower_id INT NOT NULL,     	-- Foreign key to 'borrowers.id'
    loan_date DATE,     			-- Date of loan
    return_date DATE,           	-- Date of return
	
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books(id),	
	CONSTRAINT fk_borrowers FOREIGN KEY (borrower_id) REFERENCES borrowers(id)  
);