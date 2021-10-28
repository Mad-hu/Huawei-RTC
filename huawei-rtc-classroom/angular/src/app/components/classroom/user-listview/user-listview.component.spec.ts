import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListviewComponent } from './user-listview.component';

describe('UserListviewComponent', () => {
  let component: UserListviewComponent;
  let fixture: ComponentFixture<UserListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
