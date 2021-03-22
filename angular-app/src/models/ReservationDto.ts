import { Flight } from './Flight';

export class ReservationDto {
    public constructor(init?: Partial<ReservationDto>) {
        Object.assign(this, init);
    }

    Id: number;
    UserId: number;
    DepartingFlight: Flight;
    ReturningFlight: Flight;
    //DepartingFlightSeatId: number;
    //ReturningFlightSeatId: number;
    DepartingFlightSeat: any;
    ReturningFlightSeat: any;
}