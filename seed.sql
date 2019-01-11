DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS user_types;

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects,
    teacher_id INTEGER REFERENCES people
);

CREATE TABLE enrollments (
    class_id INTEGER REFERENCES classes,
    student_id INTEGER REFERENCES people
);

INSERT INTO people
(first_name, last_name)
VALUES
('Thomas', 'Lowry'),
('Ray', 'Rackiewicz'),
('McKay', 'Nilsson'),
('Huy', 'Dang');

INSERT INTO subjects
(name)
VALUES
('Vue'),
('GraphQL'),
('React');

INSERT INTO classes
(subject_id, teacher_id)
VALUES
(1, 4),
(2, 1);

INSERT INTO enrollments
(class_id, student_id)
VALUES
(1, 3),
(2, 2),
(2, 3);
