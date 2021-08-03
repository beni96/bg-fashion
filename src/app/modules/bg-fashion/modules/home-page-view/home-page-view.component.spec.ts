import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryLink } from 'src/app/common/interfaces/category-link';
import { FirebaseStub } from 'src/app/tokens/firebase/firebase-stub';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';
import { BG_FASHION_PREFIX, BgFashionPath } from '../../router/bg-fashion.routes.names';
import { HomePageViewComponent } from './home-page-view.component';

describe('HomePageViewComponent', () => {
  let fixture: ComponentFixture<HomePageViewComponent>;
  let component: HomePageViewComponent;
  const firebaseMock = new FirebaseStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomePageViewComponent],
      providers: [{ provide: FIREBASE_TOKEN, useValue: firebaseMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get the link with suffix', () => {
    const categoryImageLink: CategoryLink = { title: 't-shirts', category: 'clothes', subcategory: 't-shirts', imageUrl: '' };
    expect(component.getLink(categoryImageLink)).toEqual(
      // tslint:disable-next-line:max-line-length
      `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${categoryImageLink.category}/${BgFashionPath.Subcategory}/${categoryImageLink.subcategory}`
    );
  });
});
