import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message, MessageDTO } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    @SubscribeMessage('chat')
    async chat(@MessageBody() data: MessageDTO) {
        const message: Message = await this.messageRepository.save({
            ...data,
            date: new Date(),
        });
        this.server.emit(`chat:${data.receiverId}`, message);
    }
}
