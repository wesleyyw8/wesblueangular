import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { FormsModule } from '@angular/forms';
import { IProfile } from './iprofile';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let fakeProfileService;
  let user: IProfile = {
    firstName: 'wes',
    lastName: 'rebelo',
    username: 'wesley',
    age: 30,
    email: 'wesleyyw8@gmail.com'
  };

  beforeEach(async(() => {
    fakeProfileService = jasmine.createSpyObj(['getProfileUser', 'setName', 'setUserEmail']);
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        FormsModule
      ],
      providers: [{
        provide: ProfileService,
        useValue: fakeProfileService
      }],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should variable isLoadingProfile be true when loading data from server and false when finished', fakeAsync(() => {
    fakeProfileService.getProfileUser.and.returnValue(Promise.resolve(user));
    fixture.detectChanges();
    expect(component.isLoadingProfile).toBe(true);
    tick();
    expect(component.user).toBe(user);
    fixture.detectChanges();
    expect(component.isLoadingProfile).toBe(false);
  }));

  it('should display a text with the string loading only while getting data from server', fakeAsync(() => {
    fakeProfileService.getProfileUser.and.returnValue(Promise.resolve(user));
    fixture.detectChanges();
    expect(component.isLoadingProfile).toBe(true);
    expect(fixture.debugElement.query(By.css('.loading')).nativeElement).toBeDefined();
    tick();
    expect(component.isLoadingProfile).toBe(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loading'))).toBeNull();
  }));

  it('should call the method setName from the service profileService when form submit', fakeAsync(() => {
    fakeProfileService.getProfileUser.and.returnValue(Promise.resolve(user));
    fakeProfileService.setName.and.returnValue(Promise.resolve(user));
    fakeProfileService.setUserEmail.and.returnValue(Promise.resolve(user));
    fixture.detectChanges();
    tick();
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    expect(fakeProfileService.setName).toHaveBeenCalled();
  }));
});
