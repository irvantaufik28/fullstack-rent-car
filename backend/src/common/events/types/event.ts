import { NotificationsEntity } from "src/api/notification/entity/notification.entity";

export interface ServerToClientEvents {
    newMessage: (payload: NotificationsEntity) => void
}