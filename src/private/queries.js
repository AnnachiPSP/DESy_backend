const checkIsNew = "SELECT is_new FROM student WHERE student_username = $1";

module.exports = {
    checkIsNew,
}