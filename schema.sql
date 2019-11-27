CREATE TABLE IF NOT EXISTS registration (
    course_id INT,
    user_id INT,
    reg_time BIGINT NOT NULL,
    course_title VARCHAR(100) NOT NULL,
    course_type VARCHAR(100) NOT NULL,
    meeting_time VARCHAR(100) NOT NULL,
    PRIMARY KEY (course_id, user_id)
);

CREATE TABLE IF NOT EXISTS users (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  email varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  major varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  interests text COLLATE utf8mb4_general_ci,
  privacy int(10) unsigned NOT NULL,
  role int(10) unsigned NOT NULL,
  PRIMARY KEY (id)
);