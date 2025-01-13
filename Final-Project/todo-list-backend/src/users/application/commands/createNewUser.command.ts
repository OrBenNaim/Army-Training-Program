import { AuthDto } from "src/auth/dto/auth.dto";

export class CreateNewUserCommand {
    constructor(public readonly signUpDto: AuthDto) {}
  }