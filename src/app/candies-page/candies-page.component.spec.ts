import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandiesPageComponent } from './candies-page.component';

describe('CandiesPageComponent', () => {
  let component: CandiesPageComponent;
  let fixture: ComponentFixture<CandiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
