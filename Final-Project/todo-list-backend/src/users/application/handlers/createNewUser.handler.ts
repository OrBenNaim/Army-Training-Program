import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface';  // eslint-disable-line
import { CreateNewUserCommand } from '../commands/createNewUser.command';


@CommandHandler(CreateNewUserCommand)
export class CreateNewUserHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(command: CreateNewUserCommand): Promise<void> {
    const { signUpDto } = command;
    await this.usersRepository.createNewUser(signUpDto);
  }
}