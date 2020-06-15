import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketProfileComponent } from './cricket-profile.component';

describe('CricketProfileComponent', () => {
  let component: CricketProfileComponent;
  let fixture: ComponentFixture<CricketProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
