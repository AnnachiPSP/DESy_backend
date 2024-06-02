const getEligibleUnis = "SELECT \
i.institute_name, i.institute_location, ib.branch, i.web_domain \
FROM Institute_Branch ib JOIN Institute i ON i.id = ib.institute_id \
JOIN Admission_Criteria ac ON ac.id = ib.admission_criteria_id \
WHERE EXTRACT( 'YEAR' FROM AGE(CURRENT_DATE, $1)) >= ac.min_age AND \
    $2 = i.institute_location AND $3 <= ac.min_jee_rank AND \
    $4 >= ac.min_class_12_mark AND $5 >= ac.min_class_10_mark";


const getBranchInfos = "SELECT \
ib.branch, ib.branch_icon, \
COUNT(DISTINCT i.id) AS number_of_colleges, \
json_agg(json_build_object( \
    'institute_id', i.id, \
    'institute_name', i.institute_name, \
    'campuse_glimpse_path', i.campus_glimpse_path, \
    'logo_path', i.logo_path, \
    'admission_criteria', json_build_object( \
        'min_jee_rank', ac.min_jee_rank, \
        'min_class_12_mark', ac.min_class_12_mark, \
        'min_class_10_mark', ac.min_class_10_mark, \
        'min_age', ac.min_age  \
    ), \
    'consortiums', ( \
        SELECT c.consortium_name \
        FROM Consortium c \
        WHERE c.institute_id = i.id \
    ) \
)) AS institute_details \
FROM \
Institute_Branch ib \
JOIN \
Institute i ON ib.institute_id = i.id \
JOIN \
Admission_Criteria ac ON ib.admission_criteria_id = ac.id \
WHERE \
ac.admission_capacity > 0 \
GROUP BY \
ib.branch, ib.branch_icon ";

module.exports = {
    getEligibleUnis,
    getBranchInfos,
}