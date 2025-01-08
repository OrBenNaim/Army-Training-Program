import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from 'src/users/application/queries/getUser.query';
import { UsersRepositoryInterface, USERS_REPOSITORY } from 'src/users/infrastructure/repository/users.repository-interface'; 
import { UserResponseDto } from '../dto/user.dto';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(query: GetUserQuery): Promise<UserResponseDto> {
    const {id} = query;
    return this.usersRepository.getUser(id);
  }
}
