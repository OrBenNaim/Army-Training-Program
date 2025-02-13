import { Injectable, UnauthorizedException, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as schema from 'src/database/schemas/vehicles';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { FleetDto } from './dto/fleet.dto';
import { FleetEntity } from 'src/interfaces/interfaces';


@Injectable()
export class FleetService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    // Method to create a new fleet.
    async createFleet(fleetDto: FleetDto):  Promise<FleetEntity> {
        
        // Check if the given fleet name already exists in db
        const result = await this.database
        .select()
        .from(schema.fleetTable)
        .where(fleetDto.name)
        .execute();
        
        if (result.length) {
            throw new ConflictException(`\nFleet with name '${fleetDto.name}' is already exists.\n`);
        }
        
        // Otherwise, create a new fleet
        const fleet = await this.database
        .insert(schema.fleetTable)
        .values({
            name: fleetDto.name,
        })
        .returning({
            id: schema.fleetTable.id,
            name: schema.fleetTable.name,
            createdAt: schema.fleetTable.createdAt,
        })
        .execute()
        .then(todos => todos[0]);

        return fleet;  // Return the newly created fleet
    }

    
}