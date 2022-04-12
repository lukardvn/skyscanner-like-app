export class NewUser {
    public constructor(init?: Partial<NewUser>) {
        Object.assign(this, init);
    }

    ExternalId: string;
    Email: string;
    Name: string;
    Surname: string;
    City: string;
    PhoneNumber: string;
    Role: string;
}