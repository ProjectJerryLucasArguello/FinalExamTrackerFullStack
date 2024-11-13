#CREATE DATABASE IF NOT EXISTS NJIT_finals_locations;

#USE NJIT_finals_locations;

#CREATE TABLE testinglocations
#(
	#Exam_Component_ID varchar(255),
   #Title varchar(255),
   # Date_of_Test varchar(255),
    #Time_of_Test varchar(255),
    #Building varchar(255),
   # Room varchar(255),
   # Instructor varchar(255),
   # class varchar(255),
   # class_level varchar(255)
#);

ALTER TABLE njit_finals_locations.testinglocations
RENAME COLUMN class TO class_name;

select * from njit_finals_locations.testinglocations;
