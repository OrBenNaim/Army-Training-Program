import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllUsersQuery } from 'src/users/application/queries/user.queries';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface'; 
import { UserEntity } from 'src/users/domain/entity/user.interface';
import { UserResponseDto } from '../dto/user.dto';


@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(): Promise<UserResponseDto[]> {
    return await this.usersRepository.getAllUsers();
  }
}
