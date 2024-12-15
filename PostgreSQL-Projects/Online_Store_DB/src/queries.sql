-- List all products in a specific category:
-- SELECT products.name AS product_name, products.description, products.price, products.category
-- FROM
-- 	products
-- WHERE products.category = 'Electronics';


-- List all orders placed by a specific customer:
-- SELECT customers.name AS customer_name, customers.email AS customer_email, orders.order_date AS order_date, orders.total_cost
-- FROM customers
-- INNER JOIN orders ON customers.id = orders.id
-- WHERE customers.id = 3;



-- List all products that are currently out of stock: 
-- SELECT products.id AS product_id, products.name AS product_name, products.description, products.price, products.category
-- FROM 
--     products 
-- JOIN 
--     inventory ON products.id = inventory.product_id
-- WHERE 
--     inventory.quantity = 0;



-- Calculate the total revenue generated by the online store:
-- SELECT SUM(total_cost) AS total_revenue
-- FROM orders;


-- Calculate the average order value:
SELECT ROUND(AVG(total_cost), 2) AS average_order_value
FROM orders;