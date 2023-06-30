-- Populating Users table
INSERT INTO
    Users (name, username, email, address)
VALUES
    (
        'John Doe',
        'johndoe',
        'johndoe@example.com',
        '123 Main St'
    ),
    (
        'Jane Smith',
        'janesmith',
        'janesmith@example.com',
        '456 Elm St'
    ),
    (
        'Michael Johnson',
        'michaelj',
        'michaelj@example.com',
        '789 Oak St'
    ),
    (
        'Sarah Wilson',
        'sarahw',
        'sarahw@example.com',
        '321 Maple Ave'
    ),
    (
        'David Brown',
        'davidb',
        'davidb@example.com',
        '987 Pine St'
    ),
    (
        'Emily Davis',
        'emilyd',
        'emilyd@example.com',
        '654 Cedar Rd'
    ),
    (
        'James Lee',
        'jamesl',
        'jamesl@example.com',
        '788 Pine St'
    ),
    (
        'Jessica Thomas',
        'jessicat',
        'jessicat@example.com',
        '457 Elm St'
    ),
    (
        'Daniel Clark',
        'danielc',
        'danielc@example.com',
        '124 Main St'
    ),
    (
        'Olivia Anderson',
        'oliviaa',
        'oliviaa@example.com',
        '988 Pine St'
    );

-- Populating Passwords table
INSERT INTO
    Passwords (userId, password)
VALUES
    (1, 'password1'),
    (2, 'password2'),
    (3, 'password3'),
    (4, 'password4'),
    (5, 'password5'),
    (6, 'password6'),
    (7, 'password7'),
    (8, 'password8'),
    (9, 'password9'),
    (10, 'password10');

-- Populating Tests table
INSERT INTO
    Tests (name, description, expectedResult, configuration)
VALUES
    (
        'Login Test',
        'Test the functionality of the login system',
        'Successful login with correct credentials',
        'Login configuration 1'
    ),
    (
        'Search Test',
        'Test the search functionality',
        'Correct items returned from search',
        'Search configuration 1'
    ),
    (
        'Logout Test',
        'Test the functionality of the logout system',
        'Successful logout',
        'Logout configuration 1'
    ),
    (
        'Navigation Test',
        'Test the navigation bar',
        'Correct page loaded on click',
        'Navigation configuration 1'
    ),
    (
        'Form Submission Test',
        'Test the functionality of form submission',
        'Form data saved correctly',
        'Form configuration 1'
    );

-- Populating TestRuns table
INSERT INTO
    TestRuns (testId, userId, result, details, duration)
VALUES
    (1, 1, 'pass', 'Login test ran successfully', 10),
    (
        2,
        1,
        'fail',
        'Search test failed with error: null pointer exception',
        15
    ),
    (
        3,
        2,
        'running',
        'Logout test is currently running',
        0
    ),
    (
        4,
        2,
        'pass',
        'Navigation test ran successfully',
        12
    ),
    (
        5,
        3,
        'fail',
        'Form Submission test failed with error: 500 internal server error',
        25
    ),
    (1, 3, 'pass', 'Login test ran successfully', 9),
    (
        2,
        4,
        'running',
        'Search test is currently running',
        0
    ),
    (3, 4, 'pass', 'Logout test ran successfully', 8),
    (
        4,
        5,
        'fail',
        'Navigation test failed with error: element not found',
        20
    ),
    (
        5,
        5,
        'pass',
        'Form Submission test ran successfully',
        30
    );

-- Populating ScheduledTests table
INSERT INTO
    ScheduledTests (testId, userId, scheduledTime)
VALUES
    (1, 6, '2023-07-01 12:00:00'),
    (2, 6, '2023-07-02 12:00:00'),
    (3, 7, '2023-07-03 12:00:00'),
    (4, 7, '2023-07-04 12:00:00'),
    (5, 8, '2023-07-05 12:00:00');

-- Populating UserNotifications table
INSERT INTO
    UserNotifications (userId, type, details)
VALUES
    (
        9,
        'email',
        'Your Login Test scheduled for 2023-07-01 12:00:00 has passed'
    ),
    (
        9,
        'sms',
        'Your Search Test scheduled for 2023-07-02 12:00:00 has failed'
    ),
    (
        10,
        'email',
        'Your Logout Test scheduled for 2023-07-03 12:00:00 is currently running'
    ),
    (
        10,
        'sms',
        'Your Navigation Test scheduled for 2023-07-04 12:00:00 has passed'
    ),
    (
        1,
        'email',
        'Your Form Submission Test scheduled for 2023-07-05 12:00:00 has failed'
    );

-- Populating UserRoles table
INSERT INTO
    UserRoles (userId, role)
VALUES
    (1, 'admin'),
    (2, 'tester'),
    (3, 'tester'),
    (4, 'admin'),
    (5, 'tester'),
    (6, 'admin'),
    (7, 'tester'),
    (8, 'admin'),
    (9, 'tester'),
    (10, 'admin');