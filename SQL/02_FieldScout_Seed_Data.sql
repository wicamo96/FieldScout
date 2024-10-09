INSERT INTO Facilities (name) VALUES
('Green Valley'),
('Sunny Acres'),
('Maple Grove');

INSERT INTO Houses (name) VALUES
('House A'),
('House B'),
('House C');

INSERT INTO FacilityHouses (facilityId, houseId) VALUES
(1, 1),
(1, 2),
(2, 3);

INSERT INTO Bays (name) VALUES
('Bay 1'),
('Bay 2'),
('Bay 3');

INSERT INTO HouseBays (bayId, houseId) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO BayDivisions (name, bayId) VALUES
('Division A', 1),
('Division B', 1),
('Division C', 2);

INSERT INTO Pests (name) VALUES
('Aphids'),
('Fungus Gnats'),
('Spider Mites'),
('Thrips'),
('Whiteflies');

INSERT INTO UserProfile (facilityId, name, email) VALUES
(1, 'John Doe', 'john@example.com'),
(2, 'Jane Smith', 'jane@example.com'),
(1, 'Emily Johnson', 'emily@example.com');

INSERT INTO ScoutingReport (userProfileId, pestId, pressure, bayDivisionId, date) VALUES
(1, 1, 'Low', 1, '2024-10-01 09:00:00'),
(2, 2, 'High', 2, '2024-10-02 10:30:00'),
(3, 3, 'Moderate', 1, '2024-10-03 11:15:00');
