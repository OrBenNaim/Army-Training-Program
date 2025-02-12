-- Drop the 'order_items' table (dependent on 'orders' and 'products')
DROP TABLE IF EXISTS order_items CASCADE;

-- Drop the 'inventory' table (dependent on 'products')
DROP TABLE IF EXISTS inventory CASCADE;

-- Drop the 'orders' table (dependent on 'customers')
DROP TABLE IF EXISTS orders CASCADE;

-- Drop the 'products' table
DROP TABLE IF EXISTS products CASCADE;

-- Drop the 'customers' table
DROP TABLE IF EXISTS customers CASCADE;

-- Optional: Add a success message (for pgAdmin)
DO $$ 
BEGIN 
    RAISE NOTICE 'All tables dropped successfully!';
END $$;
