CREATE TABLE `Users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL,
    UNIQUE `users_username_unique`(`username`),
    UNIQUE `users_email_unique`(`email`)
);

CREATE TABLE `Passwords`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `ApiKeys`(
    `apiKey` BINARY(16) NOT NULL PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Tests`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `expectedResult` TEXT NOT NULL,
    `configuration` TEXT NOT NULL
);

CREATE TABLE `TestRuns`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `testId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `startTest` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `result` ENUM('pass', 'fail', 'running') NOT NULL,
    `details` TEXT,
    `duration` INT NOT NULL,
    FOREIGN KEY(`testId`) REFERENCES `Tests`(`id`),
    FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `ScheduledTests`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `testId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `scheduledTime` TIMESTAMP NOT NULL,
    FOREIGN KEY(`testId`) REFERENCES `Tests`(`id`),
    FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `UserNotifications`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` BIGINT UNSIGNED NOT NULL,
    `type` ENUM('email', 'sms') NOT NULL,
    `details` TEXT NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `UserRoles`(
    `userId` BIGINT UNSIGNED NOT NULL,
    `role` ENUM('tester', 'admin') NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    PRIMARY KEY(`userId`, `role`)
);
