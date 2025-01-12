import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuthRepositoryInterface, AUTH_REPOSITORY } from 'src/auth/infrastructure/repository/auth.repository-interface';
import { SignInCommand } from '../commands/sign-in.command';
import { SignInResponseDto } from '../dto/sign-in.dto';


@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: AuthRepositoryInterface,
  ) {}

  async execute(command: SignInCommand) {
    const { signInDto } = command;
    return await this.authRepository.signIn(signInDto);
  }
}