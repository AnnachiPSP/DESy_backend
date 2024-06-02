CREATE TABLE Institute (
  id SERIAL PRIMARY KEY,
  institute_name VARCHAR NOT NULL,
  institute_location VARCHAR NOT NULL,
  admin_mail VARCHAR NOT NULL,
  admin_password VARCHAR NOT NULL,
  web_domain VARCHAR NOT NULL,
  logo_path VARCHAR
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
  institute_id INT,
  branch VARCHAR(3) NOT NULL,
  admission_criteria_id INT NOT NULL,
  branch_icon VARCHAR(25) NOT NULL,
  CHECK (branch IN ('CSE', 'ECE', 'AI')),
  FOREIGN KEY (institute_id) REFERENCES Institute(id),
  FOREIGN KEY (admission_criteria_id) REFERENCES Admission_Criteria(id)
);

ALTER TABLE Institute_Branch ADD PRIMARY KEY (institute_id, branch);

CREATE TABLE Student (
  student_username VARCHAR NOT NULL UNIQUE PRIMARY KEY,
  phone_number VARCHAR NOT NULL UNIQUE,
  student_mail VARCHAR NOT NULL UNIQUE,
  student_password VARCHAR NOT NULL,
  is_new INT DEFAULT 0,
  student_fullname VARCHAR,
  student_dob DATE,
  student_gender VARCHAR,
  student_location VARCHAR,
  student_aadhar_no VARCHAR,
  student_aadhar_copy VARCHAR,
  student_jee_rank INT,
  student_jee_copy VARCHAR,
  student_10_mark INT,
  student_10_copy VARCHAR,
  student_12_mark INT,
  student_12_copy VARCHAR,
  host_institute_id INT,
  host_branch VARCHAR(3),
  FOREIGN KEY (host_institute_id) REFERENCES Institute(id)
);

CREATE TABLE Application (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR NOT NULL,
  institute_id INT NOT NULL,
  branch VARCHAR(3) NOT NULL,
  status VARCHAR(10) NOT NULL,
  FOREIGN KEY (student_name) REFERENCES Student(student_username),
  FOREIGN KEY (institute_id) REFERENCES Institute(id),
  CHECK (branch IN ('CSE', 'ECE', 'AI')),
  CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED'))
);

CREATE TABLE Consortium (
  consortium_id SERIAL PRIMARY KEY,
  institute_id INT NOT NULL,
  consortium_name VARCHAR,
  FOREIGN KEY (institute_id) REFERENCES Institute(id)
);

CREATE TABLE Institute1_Students (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  branch VARCHAR(3) NOT NULL,
  -- Additional institute-specific fields as needed
);


-- Populating the Database

INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password, web_domain) VALUES ('IIITD', 'Delhi', 'admin-btech@iiitd.in', 'admin123', 'https://iiitd.ac.in/');
INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password, web_domain) VALUES ('NSUT', 'Delhi', 'admin-bachelor@nsut.in', '123admin', 'http://nsut.ac.in/');
INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password, web_domain) VALUES ('IITD', 'Delhi', 'admin-main-btech@iitd.ac.in', 'adminABC', 'https://home.iitd.ac.in/');
INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password, web_domain) VALUES ('DTU', 'Delhi', 'admin-main-bachelor@dtu.in', 'ABCadmin', 'https://dtu.ac.in');
INSERT INTO Institute (institute_name, institute_location, admin_mail, admin_password, web_domain) VALUES ('NITD', 'Delhi', 'admin-btech@nitd.ac.in', 'SuperAdmin', 'https://nitdelhi.ac.in/');

INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (5000, 95, 90, 18, 200);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (2000, 95, 90, 18, 100);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (1500, 97, 95, 19, 150);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (1000, 95, 95, 18, 100);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (6000, 90, 90, 18, 300);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (5500, 95, 90, 17, 300);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (1000, 97, 95, 19, 150);
INSERT INTO Admission_Criteria (min_jee_rank, min_class_12_mark, min_class_10_mark, min_age, admission_capacity) VALUES (10000, 95, 95, 18, 250);

INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (1, 'CSE', 2, 'bi-laptop');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (1, 'AI', 4, 'bi-robot');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (1, 'ECE', 8, 'bi-cpu');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (2, 'CSE', 3, 'bi-laptop');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (2, 'AI', 4, 'bi-robot');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (2, 'ECE', 7, 'bi-cpu');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (3, 'CSE', 5, 'bi-laptop');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (3, 'ECE', 1, 'bi-cpu');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (3, 'AI', 6, 'bi-robot');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (4, 'CSE', 4, 'bi-laptop');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (4, 'AI', 5, 'bi-robot');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (4, 'ECE', 6, 'bi-cpu');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (5, 'CSE', 1, 'bi-laptop');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (5, 'AI', 5, 'bi-robot');
INSERT INTO Institute_Branch (institute_id, branch, admission_criteria_id, branch_icon) VALUES (5, 'ECE', 1, 'bi-cpu');

INSERT INTO Consortium (institute_id, consortium_name) VALUES (1, 'First_Consortium');
INSERT INTO Consortium (institute_id, consortium_name) VALUES (3, 'First_Consortium');
INSERT INTO Consortium (institute_id, consortium_name) VALUES (5, 'First_Consortium');
INSERT INTO Consortium (institute_id, consortium_name) VALUES (2, 'Second_Consortium');
INSERT INTO Consortium (institute_id, consortium_name) VALUES (4, 'Second_Consortium');

INSERT INTO Student (student_username, phone_number, student_mail, student_password) VALUES ('surya2020', '+919657421563', 'suryatest@gmail.com', '12345');

-- Display all the admission criterias of the all the colleges and their branches

SELECT * FROM institute_branch
JOIN institute ON institute.id = institute_branch.institute_branch_id
JOIN Admission_Criteria ac ON ac.id = institute_branch.admission_criteria_id;


-- Eligible insitute list display using the application of the student and the admission criteria for each institute

SELECT i.institute_name, i.institute_location, ib.branch
FROM Institute_Branch ib
JOIN Institute i ON i.id = ib.institute_branch_id
JOIN Admission_Criteria ac ON ac.id = ib.admission_criteria_id
WHERE 1300 <= ac.min_jee_rank AND 96 >= ac.min_class_12_mark AND 91 >= ac.min_class_10_mark AND 19 >= ac.min_age;

SELECT i.id, i.institute_name, i.institute_location, ib.branch
FROM Institute_Branch ib
JOIN Institute i ON i.id = ib.institute_branch_id
JOIN Admission_Criteria ac ON ac.id = ib.admission_criteria_id
WHERE 
    EXISTS (
        SELECT 1
        FROM Student s
        WHERE s.student_username = 'surya2020'
          AND s.student_jee_rank <= ac.min_jee_rank
          AND s.student_12_mark >= ac.min_class_12_mark
          AND s.student_10_mark >= ac.min_class_10_mark
          AND EXTRACT('YEAR' FROM AGE(CURRENT_DATE, student_dob)) >= ac.min_age
          AND ac.admission_capacity >=0 
);
