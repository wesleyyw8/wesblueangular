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
    console.log(form.value);
  }
}
