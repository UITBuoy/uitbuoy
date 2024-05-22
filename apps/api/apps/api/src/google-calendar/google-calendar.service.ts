import { EventEntity } from '@/event/entities/event.entity';
import { GoogleUser } from '@/user/entities/google-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleCalendarEventDto } from './dto/google-calendar-event.dto';
import { GoogleCalendarEvent } from './entities/google-calendar-event.entity';
import { GoogleTasksApiService } from '@/api/services/google-task-api.service';

@Injectable()
export class GoogleCalendarService {
    constructor(
        @InjectRepository(GoogleCalendarEvent)
        private readonly repo: Repository<GoogleCalendarEvent>,
        private readonly googleTasksApiService: GoogleTasksApiService,
    ) {}

    async sync(
        events: EventEntity[],
        googleUser: GoogleUser,
        accessToken: string,
    ): Promise<GoogleCalendarEvent[]> {
        const googleCalendarEvents: GoogleCalendarEventDto[] =
            await Promise.all(
                events.map(async (event) => {
                    const googleCalendarEvent = await this.repo.findOneBy({
                        event: { id: event.id },
                        googleUser: { id: googleUser.id },
                    });

                    if (googleCalendarEvent) {
                        const taskReponse =
                            await this.googleTasksApiService.updateTask({
                                accessToken,
                                title: event.activityname,
                                notes: event.description,
                                due: new Date(
                                    event.timeusermidnight * 1000,
                                ).toISOString(),
                                taskList: googleUser.taskListId,
                                taskId: googleCalendarEvent.id,
                            });

                        return {
                            id: taskReponse.id,
                            lastSync: new Date().getTime(),
                            event,
                            googleUser,
                        };
                    }

                    const taskReponse =
                        await this.googleTasksApiService.createTask({
                            accessToken,
                            title: event.activityname,
                            notes: event.description,
                            due: new Date(
                                event.timeusermidnight * 1000,
                            ).toISOString(),
                            taskList: googleUser.taskListId,
                        });

                    return {
                        id: taskReponse.id,
                        lastSync: new Date().getTime(),
                        event,
                        googleUser,
                    };
                }),
            );

        return this.repo.save(googleCalendarEvents);
    }

    async findById(id: string) {
        return this.repo.findOne({
            where: { id },
            relations: {
                event: true,
                googleUser: true,
            },
        });
    }
}
