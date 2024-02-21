export interface IToken {
    token: string,
    user: IUser
}

export interface IUser {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
}
