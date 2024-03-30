import { Module } from "@nestjs/common";
import { Action } from "./entities/action.entity";
import { ApiModule } from "src/api/api.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventService } from "./event.service";
import { EventResolver } from "./event.resolver";

@Module({
    imports: [
        ApiModule,
        TypeOrmModule.forFeature([Event]),
        TypeOrmModule.forFeature([Action]),
    ],
    providers: [EventService, EventResolver],
    exports: [EventService],
})
export class EventModule {}