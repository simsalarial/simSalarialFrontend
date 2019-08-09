export class Account {
    
    'id'?: number;
    'email': string;
    'password': string;
    'userRole': UserRole;
    constructor(data?: any) {
        Object.assign(this, data);
    }
}

enum UserRole {
    Admin = "ADMIN",
    BaseUser = "USER"
}