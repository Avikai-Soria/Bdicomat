-- Populating Users table
INSERT INTO
    Users (name, username, email, address)
VALUES
    ('John Doe', 'johndoe', 'johndoe@example.com', '123 Main St'),
    ('Jane Smith', 'janesmith', 'janesmith@example.com', '456 Elm St'),
    ('Michael Johnson', 'michaelj', 'michaelj@example.com', '789 Oak St'),
    ('Sarah Wilson', 'sarahw', 'sarahw@example.com', '321 Maple Ave'),
    ('David Brown', 'davidb', 'davidb@example.com', '987 Pine St'),
    ('Emily Davis', 'emilyd', 'emilyd@example.com', '654 Cedar Rd'),
    ('James Lee', 'jamesl', 'jamesl@example.com', '788 Pine St'),
    ('Jessica Thomas', 'jessicat', 'jessicat@example.com', '457 Elm St'),
    ('Daniel Clark', 'danielc', 'danielc@example.com', '124 Main St'),
    ('Olivia Anderson', 'oliviaa', 'oliviaa@example.com', '988 Pine St');

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

-- Populating Tests table (Updated domain values to "Area X" and randomized test types)
INSERT INTO Tests (name, description, expectedResult, configuration, domain, version, type)
VALUES
    ('Login Test', 'Test the functionality of the login system', 'Successful login with correct credentials', 'Login configuration 1', 'Area A', '1.0.0', 'Functional'),
    ('Search Test', 'Test the search functionality', 'Correct items returned from search', 'Search configuration 1', 'Area B', '2.0.0', 'Negative'),
    ('Logout Test', 'Test the functionality of the logout system', 'Successful logout', 'Logout configuration 1', 'Area C', '1.5.0', 'End to end'),
    ('Navigation Test', 'Test the navigation bar', 'Correct page loaded on click', 'Navigation configuration 1', 'Area D', '2.0.0', 'Performance'),
    ('Form Submission Test', 'Test the functionality of form submission', 'Form data saved correctly', 'Form configuration 1', 'Area E', '1.0.0', 'Functional'),
    ('Payment Test', 'Test the payment process', 'Successful payment transaction', 'Payment configuration 1', 'Area F', '1.2.0', 'Performance'),
    ('User Registration Test', 'Test the user registration process', 'New user successfully registered', 'Registration configuration 1', 'Area G', '2.0.0', 'End to end'),
    ('Product Display Test', 'Test the product display on the website', 'Products displayed correctly', 'Product display configuration 1', 'Area A', '2.1.0', 'Functional'),
    ('Checkout Process Test', 'Test the checkout process', 'Successful order placement', 'Checkout configuration 1', 'Area B', '1.0.0', 'End to end'),
    ('Password Reset Test', 'Test the password reset functionality', 'Password reset email sent successfully', 'Password reset configuration 1', 'Area C', '1.1.0', 'Functional');

-- Populating TestRuns table (Added more test runs for each test)
INSERT INTO TestRuns (testId, userId, result, details, duration)
VALUES
    (1, 1, 'running', 'Login test is currently running', 0),
    (1, 2, 'pass', 'Login test ran successfully', 9),
    (1, 3, 'fail', 'Login test failed with error: invalid credentials', 15),
    (1, 4, 'pass', 'Login test ran successfully', 12),
    (2, 5, 'fail', 'Search test failed with error: timeout', 20),
    (2, 6, 'fail', 'Search test failed with error: 404 not found', 18),
    (2, 7, 'pass', 'Search test ran successfully', 12),
    (2, 8, 'running', 'Search test is currently running', 5),
    (3, 9, 'running', 'Logout test is currently running', 17),
    (3, 10, 'pass', 'Logout test ran successfully', 8),
    (3, 1, 'pass', 'Logout test ran successfully', 10),
    (4, 3, 'fail', 'Navigation test failed with error: broken link', 20),
    (4, 4, 'pass', 'Navigation test ran successfully', 12),
    (4, 5, 'pass', 'Navigation test ran successfully', 10),
    (4, 6, 'running', 'Navigation test is currently running', 0),
    (5, 7, 'fail', 'Form Submission test failed with error: 500 internal server error', 25),
    (5, 8, 'running', 'Form Submission test is currently running', 0),
    (5, 9, 'pass', 'Form Submission test ran successfully', 28),
    (5, 10, 'fail', 'Form Submission test failed with error: form validation error', 26),
    (6, 1, 'pass', 'Payment test ran successfully', 15),
    (6, 2, 'running', 'Payment test is currently running', 0),
    (6, 3, 'pass', 'Payment test ran successfully', 17),
    (6, 4, 'pass', 'Payment test ran successfully', 18),
    (7, 5, 'running', 'User Registration test is currently running', 1),
    (7, 6, 'pass', 'User Registration test ran successfully', 14),
    (7, 7, 'fail', 'User Registration test failed with error: invalid email', 20),
    (7, 8, 'pass', 'User Registration test ran successfully', 15),
    (8, 9, 'fail', 'Product Display test failed with error: missing image', 25),
    (8, 10, 'running', 'Product Display test is currently running', 23),
    (8, 1, 'running', 'Product Display test is currently running', 14),
    (8, 2, 'running', 'Product Display test is currently running', 9),
    (9, 3, 'running', 'Checkout Process test is currently running', 13),
    (9, 4, 'pass', 'Checkout Process test ran successfully', 10),
    (9, 5, 'running', 'Checkout Process test is currently running', 7),
    (9, 6, 'pass', 'Checkout Process test ran successfully', 11),
    (10, 7, 'running', 'Password Reset test is currently running', 2),
    (10, 8, 'running', 'Password Reset test is currently running', 5),
    (10, 9, 'fail', 'Password Reset test failed with error: expired link', 26),
    (10, 10, 'running', 'Password Reset test is currently running', 13);


-- Populating ScheduledTests table (Added more scheduled tests for each test)
INSERT INTO ScheduledTests (testId, userId, scheduledTime)
VALUES
    (1, 1, '2023-07-01 12:00:00'),
    (1, 2, '2023-07-02 12:00:00'),
    (1, 3, '2023-07-03 12:00:00'),
    (2, 4, '2023-07-04 12:00:00'),
    (2, 5, '2023-07-05 12:00:00'),
    (3, 6, '2023-07-06 12:00:00'),
    (3, 7, '2023-07-07 12:00:00'),
    (4, 8, '2023-07-08 12:00:00'),
    (4, 9, '2023-07-09 12:00:00'),
    (5, 10, '2023-07-10 12:00:00'),
    (5, 1, '2023-07-11 12:00:00'),
    (6, 2, '2023-07-12 12:00:00'),
    (6, 3, '2023-07-13 12:00:00'),
    (7, 4, '2023-07-14 12:00:00'),
    (7, 5, '2023-07-15 12:00:00'),
    (8, 6, '2023-07-16 12:00:00'),
    (8, 7, '2023-07-17 12:00:00'),
    (9, 8, '2023-07-18 12:00:00'),
    (9, 9, '2023-07-19 12:00:00'),
    (10, 10, '2023-07-20 12:00:00'),
    (10, 1, '2023-07-21 12:00:00');

-- Populating UserNotifications table
INSERT INTO UserNotifications (userId, type, details) VALUES
    (1, 'email', 'Your Login Test scheduled for 2023-07-01 12:00:00 has passed'),
    (1, 'email', 'Your Search Test scheduled for 2023-07-02 12:00:00 has failed'),
    (1, 'email', 'Your Logout Test scheduled for 2023-07-03 12:00:00 is currently running'),
    (2, 'email', 'Your Navigation Test scheduled for 2023-07-04 12:00:00 has passed'),
    (2, 'email', 'Your Form Submission Test scheduled for 2023-07-05 12:00:00 has failed'),
    (2, 'email', 'Your Registration Test scheduled for 2023-07-06 12:00:00 has passed'),
    (3, 'email', 'Your Profile Update Test scheduled for 2023-07-07 12:00:00 has failed'),
    (3, 'email', 'Your Password Reset Test scheduled for 2023-07-08 12:00:00 is currently running'),
    (3, 'email', 'Your Cart Checkout Test scheduled for 2023-07-09 12:00:00 has passed'),
    (4, 'email', 'Your Wishlist Test scheduled for 2023-07-10 12:00:00 has passed'),
    (4, 'email', 'Your Comment Posting Test scheduled for 2023-07-11 12:00:00 has failed'),
    (4, 'email', 'Your Rating Test scheduled for 2023-07-12 12:00:00 is currently running'),
    (5, 'email', 'Your Account Deletion Test scheduled for 2023-07-13 12:00:00 has passed'),
    (5, 'email', 'Your Order Cancellation Test scheduled for 2023-07-14 12:00:00 has failed'),
    (5, 'email', 'Your Payment Test scheduled for 2023-07-15 12:00:00 is currently running'),
    (6, 'email', 'Your Newsletter Subscription Test scheduled for 2023-07-16 12:00:00 has passed'),
    (6, 'email', 'Your Report Bug Test scheduled for 2023-07-17 12:00:00 has failed'),
    (6, 'email', 'Your Feedback Submission Test scheduled for 2023-07-18 12:00:00 is currently running'),
    (7, 'email', 'Your Profile Picture Update Test scheduled for 2023-07-19 12:00:00 has passed'),
    (7, 'email', 'Your Address Change Test scheduled for 2023-07-20 12:00:00 has failed'),
    (7, 'email', 'Your Security Settings Test scheduled for 2023-07-21 12:00:00 is currently running'),
    (8, 'email', 'Your Friends Request Test scheduled for 2023-07-22 12:00:00 has passed'),
    (8, 'email', 'Your Privacy Settings Test scheduled for 2023-07-23 12:00:00 has failed'),
    (8, 'email', 'Your Share Content Test scheduled for 2023-07-24 12:00:00 is currently running'),
    (9, 'email', 'Your Login Test scheduled for 2023-07-01 12:00:00 has passed'),
    (9, 'email', 'Your Search Test scheduled for 2023-07-02 12:00:00 has failed'),
    (9, 'email', 'Your Logout Test scheduled for 2023-07-03 12:00:00 is currently running'),
    (10, 'email', 'Your Navigation Test scheduled for 2023-07-04 12:00:00 has passed'),
    (10, 'email', 'Your Form Submission Test scheduled for 2023-07-05 12:00:00 has failed'),
    (10, 'email', 'Your Registration Test scheduled for 2023-07-06 12:00:00 has passed');

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

-- Populating BugReports table (Added 20 random bug reports related to the 10 testIds)
INSERT INTO BugReports (testId, userId, bugDescription, location, version, domain, status, isExcepted, creationDate)
VALUES
    (1, 2, 'Login page UI alignment issue', 'BLZ', '1.0.0', 'Area A', 'closed', 'yes', '2023-01-01'),
    (1, 3, 'Login test failed with error: invalid credentials', 'CHN', '2.0.1', 'Area B', 'open', 'no', '2022-02-05'),
    (1, 4, 'Login test failed with error: timeout', 'IRL', '1.1.0', 'Area C', 'open', 'no', '2021-03-12'),
    (2, 5, 'Search test failed with error: 404 not found', 'ISR', '2.1.0', 'Area D', 'open', 'no', '2014-04-15'),
    (2, 6, 'Search test failed with error: server error', 'ITA', '1.2.0', 'Area E', 'open', 'no', '2023-05-20'),
    (2, 7, 'Search test failed with error: element not found', 'RUS', '2.0.1', 'Area F', 'open', 'yes', '2023-06-25'),
    (3, 8, 'Logout test failed with error: broken link', 'USA', '1.1.0', 'Area G', 'open', 'no', '2023-07-03'),
    (3, 9, 'Logout test failed with error: missing element', 'USA', '2.1.0', 'Area A', 'open', 'no', '2016-08-08'),
    (3, 10, 'Logout test failed with error: invalid email', 'CHN', '1.2.0', 'Area B', 'open', 'no', '2023-09-11'),
    (4, 1, 'Navigation test failed with error: form validation error', 'RUS', '2.0.1', 'Area C', 'open', 'no', '2023-10-17'),
    (4, 2, 'Navigation test failed with error: broken link', 'RUS', '1.1.0', 'Area D', 'open', 'no', '2023-11-22'),
    (4, 3, 'Navigation test failed with error: missing image', 'BLZ', '2.1.0', 'Area E', 'closed', 'yes', '2023-12-29'),
    (5, 4, 'Form Submission test failed with error: server error', 'ISR', '1.0.0', 'Area F', 'open', 'no', '2011-01-03'),
    (5, 5, 'Form Submission test failed with error: form validation error', 'USA', '2.0.1', 'Area G', 'open', 'no', '2017-02-05'),
    (5, 6, 'Form Submission test failed with error: timeout', 'USA', '1.1.0', 'Area A', 'open', 'no', '2013-03-09'),
    (6, 7, 'Payment test failed with error: invalid card details', 'BLZ', '2.1.0', 'Area B', 'open', 'no', '2021-04-12'),
    (6, 8, 'Payment test failed with error: payment declined', 'CHN', '1.2.0', 'Area C', 'open', 'no', '2015-05-16'),
    (6, 9, 'Payment test failed with error: server error', 'ITA', '2.0.1', 'Area D', 'open', 'no', '2012-06-20'),
    (7, 10, 'User Registration test failed with error: invalid email format', 'USA', '1.1.0', 'Area E', 'testing', 'yes', '2019-07-25'),
    (7, 1, 'User Registration test failed with error: invalid password', 'RUS', '2.1.0', 'Area F', 'open', 'no', '2011-08-30');

