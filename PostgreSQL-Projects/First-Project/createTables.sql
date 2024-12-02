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




