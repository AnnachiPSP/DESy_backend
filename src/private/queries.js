const checkIsNew = "SELECT is_new FROM student WHERE student_username = $1";
const updateStudentApplication = "UPDATE student SET student_fullname = $1, student_dob = $2, student_gender = $3, student_location = $4, student_aadhar_no = $5, student_aadhar_copy = $6, student_jee_rank = $7, student_jee_copy = $8, student_10_mark = $9, student_10_copy = $10, student_12_mark = $11, student_12_copy = $12, is_new = 1 WHERE student_username = $13";
const eligibleInstitutes = "SELECT i.id, i.institute_name, i.institute_location, ib.branch FROM Institute_Branch ib JOIN Institute i ON i.id = ib.institute_branch_id JOIN Admission_Criteria ac ON ac.id = ib.admission_criteria_id WHERE EXISTS ( SELECT 1 FROM Student s WHERE s.student_username = $1 AND s.student_jee_rank <= ac.min_jee_rank AND s.student_12_mark >= ac.min_class_12_mark AND s.student_10_mark >= ac.min_class_10_mark AND EXTRACT('YEAR' FROM AGE(CURRENT_DATE, student_dob)) >= ac.min_age AND ac.admission_capacity >=0 ) ORDER BY i.institute_name ASC";
const applicationGenerate = "INSERT INTO application (student_name, institute_id, branch, status) VALUES ($1, $2, $3, 'PENDING')";

module.exports = {
    checkIsNew,
    updateStudentApplication,
    eligibleInstitutes,
    applicationGenerate,
}