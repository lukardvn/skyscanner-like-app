import { Flight } from "./Flight";
import { User } from "./User";

export class InvitationDto {
    public constructor(init?: Partial<InvitationDto>) {
        Object.assign(this, init);
    }

    /*Id: number;
    UserSendingId: number;
    UserReceivingId: number;
    DepartingFlightId: number;
    ReturningFlightId: number;*/
    
    Id: number;
    UserReceiving: User;
    UserSendingId: number;
    DepartingFlightId: number;
    ReturningFlightId: number;
    DepartingFlightSeatId: number;
    ReturningFlightSeatId: number;
}