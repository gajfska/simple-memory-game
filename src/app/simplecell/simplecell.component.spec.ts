import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplecellComponent } from './simplecell.component';

describe('SimplecellComponent', () => {
  let component: SimplecellComponent;
  let fixture: ComponentFixture<SimplecellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplecellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
