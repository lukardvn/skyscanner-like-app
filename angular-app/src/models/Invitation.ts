import { Flight } from "./Flight";
import { User } from "./User";

export class Invitation {
    public constructor(init?: Partial<Invitation>) {
        Object.assign(this, init);
    }

    Id: number;
    UserReceiving: User;
    UserSendingId: number;
    DepartingFlightId: number;
    ReturningFlightId: number;
}