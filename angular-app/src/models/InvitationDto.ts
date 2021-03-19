import { Flight } from "./Flight";

export class InvitationDto {
    public constructor(init?: Partial<InvitationDto>) {
        Object.assign(this, init);
    }

    Id: number;
    UserSendingId: number;
    UserReceivingId: number;
    DepartingFlightId: number;
    ReturningFlightId: number;
}