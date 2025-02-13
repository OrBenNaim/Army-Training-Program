import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FleetController } from './fleet.controller';
import { FleetService } from './fleet.srevice';


@Module({
    imports: [
      CqrsModule,   // Enables CQRS (Command Query Responsibility Segregation) pattern
    ],
    controllers: [ FleetController ],
    providers: [ FleetService ],
  
})
export class FleetModule {}
