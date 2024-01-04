CREATE TABLE Institute (
  id SERIAL PRIMARY KEY,
  institute_name VARCHAR NOT NULL,
  institute_location VARCHAR NOT NULL,
  admin_mail VARCHAR NOT NULL,
  admin_password VARCHAR NOT NULL
);

CREATE TABLE Admission_Criteria (
  id SERIAL PRIMARY KEY,
  min_jee_rank INT NOT NULL,
  min_class_12_mark INT NOT NULL,
  min_class_10_mark INT NOT NULL,
  min_age INT NOT NULL,
  admission_capacity INT NOT NULL
);

CREATE TABLE Institute_Branch (
  institute_branch_id INT,
  branch VARCHAR(3) NOT NULL,
  admission_criteria_id INT NOT NULL,
  CHECK (branch IN ('CSE', 'ECE', 'AI')),
  FOREIGN KEY (institute_branch_id) REFERENCES Institute(id),
  FOREIGN KEY (admission_criteria_id) REFERENCES Admission_Criteria(id)
);

ALTER TABLE Institute_Branch ADD PRIMARY KEY (institute_id, branch);

CREATE TABLE Student (
  id SERIAL PRIMARY KEY,
  student_username VARCHAR NOT NULL UNIQUE,
  phone_number VARCHAR NOT NULL UNIQUE,
  student_mail VARCHAR NOT NULL UNIQUE,
  student_password VARCHAR NOT NULL,
  is_new BOOLEAN DEFAULT TRUE,
  host_institute_id INT,
  host_branch VARCHAR(3),
  FOREIGN KEY (host_institute_id) REFERENCES Institute(id)
);

CREATE TABLE Application (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  institute_id INT NOT NULL,
  branch VARCHAR(3) NOT NULL,
  jee_rank INT NOT NULL,
  class_12_mark INT NOT NULL,
  age INT NOT NULL,
  status VARCHAR(10) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES Student(id),
  FOREIGN KEY (institute_id) REFERENCES Institute(id),
  CHECK (branch IN ('CSE', 'ECE', 'AI')),
  CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED'))
);

CREATE TABLE Institute1_Students (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  branch VARCHAR(3) NOT NULL,
  -- Additional institute-specific fields as needed
);


-- Populating the Database

INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password) VALUES ('IIITD', 'Delhi', 'admin-btech@iiitd.in', 'admin123');
INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password) VALUES ('NSUT', 'Delhi', 'admin-bachelor@nsut.in', '123admin');

INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (5000, 95, 90, 18, 200);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (2000, 95, 90, 18, 100);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (1500, 97, 95, 19, 150);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (1000, 95, 95, 18, 100);

INSERT INTO Institute_Branch (institute_branch_id, branch, admission_criteria_id) VALUES (1, 'CSE', 2);
INSERT INTO Institute_Branch (institute_branch_id, branch, admission_criteria_id) VALUES (1, 'ECE', 1);
INSERT INTO Institute_Branch (institute_branch_id, branch, admission_criteria_id) VALUES (2, 'CSE', 3);
INSERT INTO Institute_Branch (institute_branch_id, branch, admission_criteria_id) VALUES (2, 'AI', 4);

INSERT INTO Student (student_username, phone_number, student_mail, student_password) VALUES ('surya2020', '+919657421563', 'suryatest@gmail.com', '12345');


-- Eligible insitute list display using the application of the student and the admission criteria for each institute

SELECT i.institute_name, ib.branch
FROM Institute_Branch ib
JOIN Institute i ON i.id = ib.institute_branch_id
JOIN Admission_Criteria ac ON ac.id = ib.admission_criteria_id
WHERE 1300 <= ac.min_jee_rank AND 96 >= ac.min_class_12_mark AND 91 >= ac.min_class_10_mark AND 19 >= ac.min_age;

