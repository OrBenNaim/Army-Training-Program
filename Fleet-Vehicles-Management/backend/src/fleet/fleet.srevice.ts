import { Injectable, UnauthorizedException, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import * as schema from 'src/database/schemas/fleets';
import { fleetsTable } from 'src/database/schemas/fleets';
import { DATABASE_CONNECTION } from 'src/database/db-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { CreateFleetDto } from './dto/fleet.dto';
import { FleetEntity } from 'src/interfaces/interfaces';


@Injectable()
export class FleetService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    // Method to create a new fleet.
    async createFleet(createFleetDto: CreateFleetDto):  Promise<FleetEntity> {
        
        // Check if the given fleet name already exists in db
        const result = await this.database
        .select()
        .from(fleetsTable)
        .where(eq(fleetsTable.name , createFleetDto.name))
        .execute();
        
        if (result.length) {
            throw new ConflictException(`\nFleet with name '${createFleetDto.name}' is already exists.\n`);
        }
        
        // Otherwise, create a new fleet
        const fleet = await this.database
        .insert(fleetsTable)
        .values({
            name: createFleetDto.name,
        })
        .returning({
            id: fleetsTable.id,
            name: fleetsTable.name,
            createdAt: fleetsTable.createdAt,
        })
        .execute()
        .then(fleets => fleets[0]);

        return fleet;  // Return the newly created fleet
    }    
}