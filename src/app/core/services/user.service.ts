import { Injectable, signal } from '@angular/core';
import { IToken, IUser } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private prefix: string = '$SCHOOLMANAGEMENTSYSTEM$';
  private user = signal<IUser | null>(null)
  private token = signal<IToken | null>(null)



  constructor() {
    //@ts-ignore
    this.token.update((val) => ({ ...val, user: (this.load('user')) }))
    //@ts-ignore
    this.token.update((val) => ({ ...val, token: (this.load('token')) }))

  }



  setUser(user: IUser) {
    this.user.set(user)
    this.save()
  }


  setToken(token: IToken) {
    this.token.set(token)
    this.setUser(token.user)
  }

  /**
  * @method getUser
  * @return {any}
  * @description
  * This method will return the current user instance.
  **/
  public getUser(): any {
    return typeof this.token()?.user === 'string' ? JSON.parse(this.token()?.user as any) : this.token()?.user;
  }

  public isAuthenticated(): any {
    return localStorage.getItem(`${this.prefix}token`) && localStorage.getItem(`${this.prefix}user`)
  }



  /**
 * @method save
 * @return {boolean} Whether or not the information was saved
 * @description
 * This method will save in either local storage or cookies the current credentials.
 **/
  public save(): boolean {
    this.persist('token', this.token()?.token);
    this.persist('user', { firstName: this.user()?.firstName, lastName: this.user()?.lastName, email: this.user()?.email });
    return true;
  }

  /**
  * @method clear
  * @return {void}
  * @description
  * This method will clear cookies or the local storage.
  **/
  public clear(): void {
    Object.keys(this.token() as any).forEach((prop: string) => localStorage.removeItem(`${this.prefix}${prop}`));
    this.token.set(null)
    this.user.set(null)
  }

  /**
 * @method persist
 * @return {void}
 * @description
 * This method saves values to storage
 **/
  protected persist(prop: string, value: any, expires?: any): void {
    try {
      if (value)
        localStorage.setItem(`${this.prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value);
    } catch (err) {
      console.error('Cannot access local/session storage:', err);
    }
  }

  /**
 * @method load
 * @param {string} prop Property name
 * @return {any} Any information persisted in storage
 * @description
 * This method will load either from local storage or cookies the provided property.
 **/
  protected load(prop: string) {
    return localStorage.getItem(`${this.prefix}${prop}`);
  }



}
