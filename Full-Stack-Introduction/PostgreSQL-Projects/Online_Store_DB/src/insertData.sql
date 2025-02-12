-- Insert data into the 'customers' table
INSERT INTO customers (name, email, password)
VALUES
    ('John Doe', 'johndoe@example.com', MD5('1234')), 			-- MD5 hash for '1234'
    ('Jane Smith', 'janesmith@gmail.com', MD5('5555')), 		-- MD5 hash for '5555'
    ('Yuval Dan', 'yuvalDan@gmail.com', MD5('9513'));			-- MD5 hash for '9513'




-- Insert data into the 'products' table
INSERT INTO products (name, description, price, category)
VALUES
    ('Smartphone', 'Latest model smartphone with all the features', 699.99, 'Electronics'),
    ('T-Shirt', 'Cotton t-shirt available in various sizes', 19.99, 'Clothing'),
    ('Laptop', 'High-performance laptop for work and play', 999.99, 'Electronics'),
    ('Jeans', 'Denim jeans with a comfortable fit', 49.99, 'Clothing'),
    ('Apple Watch','45-mm screen, Model 7', 1500, 'Electronics');




-- Insert placeholder rows into the 'orders' table
INSERT INTO orders (customer_id, order_date, total_cost)
VALUES
    (1, '2024-12-01', 0),   -- Placeholder total_cost for John Doe's order
    (2, '2024-11-05', 0),   -- Placeholder total_cost for Jane Smith's order
    (3, CURRENT_DATE, 0);  -- Placeholder total_cost for Yuval Dan's order




-- Insert data into the 'order_items' table
INSERT INTO order_items (order_id, product_id, quantity, subtotal)
VALUES
    (1, 1, 1, 699.99),  	-- John Doe's Smartphone
    (1, 2, 1, 19.99),   	-- John Doe's T-Shirt
    (2, 3, 1, 999.99),  	-- Jane Smith's Laptop
    (2, 4, 1, 49.99),   	-- Jane Smith's Jeans
    (3, 2, 2, 39.98);		-- Yuval Dan's T-Shirts




-- Update the 'total_cost' column in the 'orders' table based on 'order_items'
UPDATE orders
SET total_cost = (
    SELECT SUM(subtotal)
    FROM order_items
    WHERE order_items.order_id = orders.id
);




-- Insert data into the 'inventory' table
INSERT INTO inventory (product_id, quantity)
VALUES
    (1, 100),  	-- 100 Smartphones in stock
    (2, 200),  	-- 200 T-Shirts in stock
    (3, 50),   	-- 50 Laptops in stock
    (4, 150),  	-- 150 Jeans in stock
    (5, 0);		-- Apple Watch out of stock
