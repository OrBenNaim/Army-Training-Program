import { Controller, Post, Body, } from '@nestjs/common';
import { FleetDto } from 'src/fleet/dto/fleet.dto'; 
import { FleetService } from './fleet.srevice';


@Controller('fleets')
export class FleetController {
    constructor(private fleetService: FleetService) {}    

    @Post()
    async createFleet(@Body() fleetDto: FleetDto) {
        try {
            return await this.fleetService.createFleet(fleetDto);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}

    