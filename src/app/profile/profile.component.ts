import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { IProfile } from './iprofile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  public isLoadingProfile = false;
  public isSavingProfile = false;
  public error = {
    isErrorShown: false,
    message: ''
  };
  public user: IProfile = {
    firstName: '',
    lastName: '',
    username: '',
    age: 0,
    email: ''
  };
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.isLoadingProfile = true;
    this.profileService.getProfileUser().then((user: IProfile) => {
      this.user = user;
      this.isLoadingProfile = false;
      this.resetErrorMessage();
    }, err => {
      this.showError(err.error);
      this.isLoadingProfile = false;
      this.getData();
    });
  }

  private showError(message) {
    this.error = {
      isErrorShown: true,
      message
    };
  }

  private resetErrorMessage() {
    this.error = {
      isErrorShown: false,
      message: ''
    };
  }

  saveProfile(form) {
    console.log('12312312')
    if (form.value.firstname !== '' && form.value.lastname !== '') {
      console.log('adawd')
      this.isLoadingProfile = true;
      this.resetErrorMessage();
      this.profileService.setName(form.value.firstName, form.value.lastName).then((user: IProfile) => {
        this.user = user;
        this.saveEmail(user);
      }, err => {
        this.showError(err.error);
        this.isLoadingProfile = false;
      });
    }
  }

  private saveEmail(user) {
    this.profileService.setUserEmail(user).then((userResp: IProfile) => {
      this.user = userResp;
      this.isLoadingProfile = false;
    }, err => {
      this.showError(err.error);
      this.isLoadingProfile = false;
    });
  }
}
