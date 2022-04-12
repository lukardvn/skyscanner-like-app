
export class UserAirlineDto {
    public constructor(init?: Partial<UserAirlineDto>) {
        Object.assign(this, init);
    }

    UserId: number;
    AirlineId: number;
}