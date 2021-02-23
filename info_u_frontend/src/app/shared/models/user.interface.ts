export interface Roles {
    editor?: boolean;
    admin?: boolean;
}

export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles?: Roles;
}