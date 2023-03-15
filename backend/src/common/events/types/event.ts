import { NotificationsEntity } from "src/entities/notification.entity" 

export interface ServerToClientEvents {
    newMessage: (payload: NotificationsEntity) => void
}