import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import * as schema from 'src/database/schemas/todos';
import { usersTable } from 'src/database/schemas/users';
import { eq } from 'drizzle-orm';


@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }


    async validate(payload: {sub: number, username: string, createdAt: Date}) {
        const user = await this.database
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, payload.sub))
        .execute()
        .then(users => users[0]);
        
        if (!user) {
            throw new UnauthorizedException('Invalid token or user does not exist');
        }

        return {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt,
        }
    }
}