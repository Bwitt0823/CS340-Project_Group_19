-- Project Group 19
-- Alexander Swider & Bradford Witt
-- February 10, 2019
-- Data Definition Queries


DROP TABLE IF EXISTS Player_Position;
DROP TABLE IF EXISTS Coach_Position;
DROP TABLE IF EXISTS Position;
DROP TABLE IF EXISTS Player;
DROP TABLE IF EXISTS Coach;
DROP TABLE IF EXISTS Front_Office;
DROP TABLE IF EXISTS Team;

-- Create Team Table
CREATE TABLE Team (
    Abbreviation char(4) PRIMARY KEY,
    Name char(25),
    City char(50),
    State char(50),
    Country char(50),
    Stadium char(50)
);

-- Create Front_Office Table
CREATE TABLE Front_Office (
    ID_Front_Office int AUTO_INCREMENT PRIMARY KEY,
    First_Name char(50),
    Last_Name char(50),
    Role char(50),
    Team char(4),
    FOREIGN KEY Team_Front_Office (Team)
    	REFERENCES Team (Abbreviation)
);

-- Create Coach Table
CREATE TABLE Coach (
    ID_Coach int AUTO_INCREMENT PRIMARY KEY,
    First_Name char(50),
    Last_Name char(50),
    Team char(4),
    FOREIGN KEY Team_Coach (Team)
    	REFERENCES Team (Abbreviation)
);

-- Create Player Table
CREATE TABLE Player (
    ID_Player int AUTO_INCREMENT PRIMARY KEY,
    First_Name char(50),
    Last_Name char(50),
    College char(50),
    Number char(2),
    Team char(4),
    FOREIGN KEY Team_Player (Team)
    	REFERENCES Team (Abbreviation)
);

-- Create Position Table
CREATE TABLE Position (
    ID_Position int AUTO_INCREMENT PRIMARY KEY,
    Position_Type char(15),
    Position_Group char(25)
);

-- Create Player_Position Table
CREATE TABLE Player_Position (
    ID_Player int,
    ID_Position int,
    PRIMARY KEY (ID_Player, ID_Position),
    FOREIGN KEY Player_ID (ID_Player)
    	REFERENCES Player (ID_Player) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY pPosition_ID (ID_Position)
    	REFERENCES Position (ID_Position)
);

-- Create Coach_Position Table
CREATE TABLE Coach_Position (
    ID_Coach int,
    ID_Position int,
    PRIMARY KEY (ID_Coach, ID_Position),
    FOREIGN KEY Coach_ID (ID_Coach)
    	REFERENCES Coach (ID_Coach) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY cPosition_ID (ID_Position)
    	REFERENCES Position (ID_Position)
);

-- Insert Sample Team
INSERT INTO Team 
	(Abbreviation, Name, City, State, Country, Stadium)
VALUES ('NE', 'Patriots', 'New England', 'Massachusetts', 'United States', 'Gillette Stadium'),
		('LAR', 'Rams', 'Los Angeles', 'California', 'United States', 'Los Angeles Memorial Coliseum');

-- Insert Sample Player
INSERT INTO Player
	(First_Name, Last_Name, College, Number, Team)
VALUES ('Tom', 'Brady', 'Michigan', '12', 'NE'),
		('Aaron', 'Donald', 'Pittsburgh', '99', 'LAR');

-- Insert Sample Coach
INSERT INTO Coach
	(First_Name, Last_Name, Team)
VALUES ('Bill', 'Belichick', 'NE'),
		('Sean', 'McVay', 'LAR');

-- Insert Sample Front Office Members
INSERT INTO Front_Office 
	(First_Name, Last_Name, Roll, Team)
VALUES ('Robert', 'Craft', 'Owner', 'NE'),
		('Bill', 'Belichick', 'General Manager', 'NE'),
		('Stan', 'Kroenke', 'Owner', 'LAR'),
		('Les', 'Snead', 'General Manager', 'LAR');

-- Insert Sample Positions
INSERT INTO Position
	(Position_Type, Position_Group)
VALUES ('Offense', 'Quarterback'),
		('Defense', 'Defensive Tackle');
