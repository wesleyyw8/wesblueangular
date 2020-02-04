import { IProfile } from './iprofile';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public user: IProfile;
  constructor() { }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName : 'Michael',
            lastName : 'Collins',
            username : 'michael.collins',
            age : 30
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          this.user = {
            ...this.user,
            firstName,
            lastName
          };
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail(user: IProfile) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email = `${user.firstName.trim()}.${user.lastName.trim()}@blueface.com`;
          resolve(this.user);
        } else {
          reject({ error: 'Error onemail generation' });
        }
      }, Math.random() * 5000);
    });
  }
}

