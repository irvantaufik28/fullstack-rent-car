import { NotificationsEntity } from "src/database/entities/notification.entity"  

export interface ServerToClientEvents {
    newMessage: (payload: NotificationsEntity) => void
}