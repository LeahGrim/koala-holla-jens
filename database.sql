CREATE TABLE "koala" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	gender VARCHAR(10),
	age NUMERIC,
	ready_to_transfer BOOLEAN DEFAULT FALSE,
	notes VARCHAR(1000)
	);
INSERT INTO "koala" 
	("name", "gender", "age", "ready_to_transfer", "notes") 
VALUES 
	('Scotty', 'M', '4', 'TRUE','Born in Guatemala'),
	('Jean', 'F', '5', 'TRUE','Allergic to lots of lava'),
	('Ororo', 'F', '7', 'FALSE','Loves listening to Paula (Abdul)'),
	('Logan', 'M', '15', 'FALSE','Loves the sauna'),
	('Charlie', 'M', '9', 'TRUE','Favorite band is Nirvana'),
	('Betsy', 'F', '4', 'TRUE','Have a pet iguana');
SELECT * FROM koala;