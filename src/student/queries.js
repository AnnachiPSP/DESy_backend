// Defining all the required Queried for Student's purpose

const getStudents = "SELECT * FROM student";
const getStudentById = "SELECT * FROM student WHERE id = $1";
const checkStudentExist = "SELECT * FROM student WHERE student_username = $1 OR phone_number = $2 OR student_mail = $3";
const addStudent = "INSERT INTO student (student_username, phone_number, student_mail, student_password) VALUES ($1, $2, $3, $4)";
const loginStudent = "SELECT student_username, student_mail, student_password FROM student WHERE student_mail = $1";

module.exports = {
    getStudents,
    getStudentById,
    checkStudentExist,
    addStudent,
    loginStudent,
}