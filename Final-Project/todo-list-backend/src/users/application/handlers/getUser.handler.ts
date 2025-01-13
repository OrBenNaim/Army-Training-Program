import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserByNameQuery } from 'src/users/application/queries/user.queries';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface'; 
import { UserResponseDto } from '../dto/user.dto';
import { UserEntity } from 'src/users/domain/entity/user.interface';

@QueryHandler(GetUserByNameQuery)
export class GetUserByNameHandler implements IQueryHandler<GetUserByNameQuery> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(query: GetUserByNameQuery): Promise<UserEntity> {
    const {username, password} = query;
    return this.usersRepository.getUserByName(username, password);
  }
}
