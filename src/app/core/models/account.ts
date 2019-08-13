export class Account {
    
    'id'?: number;
    'email': string;
    'password'?: string;
    'accountRole'?: AccountRole;
    
    constructor(data?: any) {
        Object.assign(this, data);
    }
}

enum AccountRole {
    Admin = "ADMIN",
    BaseUser = "USER"
}