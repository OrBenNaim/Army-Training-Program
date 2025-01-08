import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsDate } from 'class-validator';

/**
 * Data Transfer Object (DTO) for user responses.
 * Used for returning data in response to `GetUser`, `GetAllUsers`, `DeleteUser`, `DeleteAllUsers`, and `UpdateUser` requests.
 */
export class UserResponseDto {
    /**
     * The unique identifier of the user.
     * Must be a number and cannot be empty.
     */
    @IsNotEmpty()
    @IsNumber()
    userId: number;     

    /**
     * The username of the user.
     * Must be a non-empty string.
     */
    @IsNotEmpty()
    @IsString()
    username: string;

    /**
     * The date and time when the user was created.
     * Must be a valid Date object and cannot be empty.
     */
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;
}

/**
 * Data Transfer Object (DTO) for updating a user.
 * Used in `UpdateUser` requests to modify user details.
 */
export class UpdateUserDto {
    /**
     * The unique identifier of the user to be updated.
     * Must be a number and cannot be empty.
     */
    @IsNotEmpty()
    @IsNumber()
    userId: number;     

    /**
     * The new username for the user (optional).
     * Must be a string if provided. Defaults to `null` if not specified.
     */
    @IsOptional()
    @IsString()
    username?: string = null;

    /**
     * The new password for the user (optional).
     * Must be a string if provided. Defaults to `null` if not specified.
     */
    @IsOptional()
    @IsString()
    password?: string = null;
}
