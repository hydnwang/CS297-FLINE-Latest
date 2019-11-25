CREATE TABLE IF NOT EXISTS registration (
    course_id INT,
    user_id INT,
    timestamp INT,
    course_title VARCHAR(100) NOT NULL,
    course_type VARCHAR(100) NOT NULL,
    meeting_time VARCHAR(100) NOT NULL,
    PRIMARY KEY (course_id, user_id)
);