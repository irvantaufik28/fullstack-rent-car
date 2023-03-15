import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { NotificationsEntity } from 'src/api/notification/entity/notification.entity';
import { ServerToClientEvents } from './types/event';

@WebSocketGateway({ namespace: 'events' })
export class EventsGateway {
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;
  @SubscribeMessage('message')
  sendMessage(message: NotificationsEntity) {
    this.server.emit('newMessage', message);
  }
}
