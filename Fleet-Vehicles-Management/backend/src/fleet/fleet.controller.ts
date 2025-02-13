import { Controller, Post, Body, } from '@nestjs/common';
import { CreateFleetDto } from 'src/fleet/dto/fleet.dto'; 
import { FleetService } from './fleet.srevice';


@Controller('fleets')
export class FleetController {
    constructor(private fleetService: FleetService) {}    

    @Post()
    async createFleet(@Body() createFleetDto: CreateFleetDto) {
        try {
            return await this.fleetService.createFleet(createFleetDto);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}

    