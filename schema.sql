CREATE TABLE IF NOT EXISTS registration (
    course_id INT,
    user_id INT,
    reg_time BIGINT NOT NULL,
    course_title VARCHAR(100) NOT NULL,
    course_type VARCHAR(100) NOT NULL,
    meeting_time VARCHAR(100) NOT NULL,
    term VARCHAR(100) NOT NULL,
    PRIMARY KEY (course_id, user_id,term)
);

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `major` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `interests` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `thumbnail` varchar(100) COLLATE utf8mb4_general_ci DEFAULT '',
  `privacy` int(10) unsigned DEFAULT '0',
  `role` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS friendship (
    from_id INT REFERENCES users(id),
    to_id INT REFERENCES users(id),
    status ENUM('pending', 'friend') NOT NULL,
    PRIMARY KEY (from_id, to_id)
);
