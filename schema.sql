-- GrubPac Database Schema

-- for Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- for Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- for Demo Data
INSERT INTO rooms (name, description, price_per_night, capacity, image_url) VALUES 
('Deluxe Suite', 'A beautiful suite with sea view, king-sized bed, and premium amenities.', 150.00, 2, 'https://images.unsplash.com/photo-1590490360182-c33d57733427'),
('Family Room', 'Spacious room for the whole family with two queen beds and a city view.', 250.00, 4, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'),
('Economy Single', 'Cozy room perfect for solo travelers on a budget.', 80.00, 1, 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511');
