-- Create the Users table
CREATE TABLE `Users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL,
    UNIQUE `users_username_unique` (`username`),
    UNIQUE `users_email_unique` (`email`)
);

-- Create the Passwords table
CREATE TABLE `Passwords` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
);

-- Create the ApiKeys table
CREATE TABLE `ApiKeys` (
    `apiKey` BINARY(16) NOT NULL PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
);

-- Create the Tests table
CREATE TABLE `Tests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `expectedResult` TEXT NOT NULL,
    `configuration` TEXT NOT NULL,
    `domain` VARCHAR(255),
    `version` VARCHAR(20)
);

-- Create the TestRuns table
CREATE TABLE `TestRuns` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `testId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `startTest` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `result` ENUM('pass', 'fail', 'running') NOT NULL,
    `details` TEXT,
    `duration` INT NOT NULL,
    FOREIGN KEY (`testId`) REFERENCES `Tests` (`id`),
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
);

-- Create the ScheduledTests table
CREATE TABLE `ScheduledTests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `testId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `scheduledTime` TIMESTAMP NOT NULL,
    FOREIGN KEY (`testId`) REFERENCES `Tests` (`id`),
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
);

-- Create the BugReports table
CREATE TABLE `BugReports` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `testId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `bugDescription` TEXT NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `isExcepted` ENUM('yes', 'no') NOT NULL,
    FOREIGN KEY (`testId`) REFERENCES `Tests` (`id`),
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
);

-- Create the UserNotifications table
CREATE TABLE `UserNotifications` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `type` ENUM('email', 'sms') NOT NULL,
    `details` TEXT NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
);

-- Create the UserRoles table
CREATE TABLE `UserRoles` (
    `userId` BIGINT UNSIGNED NOT NULL,
    `role` ENUM('tester', 'admin') NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`userId`, `role`)
);
