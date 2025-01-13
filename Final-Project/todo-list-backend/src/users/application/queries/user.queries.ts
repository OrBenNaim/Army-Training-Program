export class GetUserByNameQuery {
    constructor(
        public readonly username: string,
        public readonly password: string,
    ) {}
}

export class GetAllUsersQuery {}