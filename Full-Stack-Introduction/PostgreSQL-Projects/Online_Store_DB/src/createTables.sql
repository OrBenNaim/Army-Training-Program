-- Create the 'products' table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    category VARCHAR(50) NOT NULL,

	CONSTRAINT unique_product_name UNIQUE (name)
);



-- Create the 'customers' table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,             
    name VARCHAR(100) NOT NULL, 
	email VARCHAR(255) NOT NULL UNIQUE,
	password CHAR(32) NOT NULL
);


-- Create the 'orders' table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id),
    order_date DATE DEFAULT CURRENT_DATE,
    total_cost NUMERIC(10, 2) NOT NULL CHECK (total_cost >= 0)
);

	

-- Create the 'order_items' table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,		
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0)
);



-- Create the 'inventory' table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity >= 0)
);

