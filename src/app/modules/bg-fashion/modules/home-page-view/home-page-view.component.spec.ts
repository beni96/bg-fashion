import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BG_FASHION_PREFIX, BgFashionPath } from '../../router/bg-fashion.routes.names';
import { CategoryImageLink, HomePageViewComponent } from './home-page-view.component';

describe('HomePageViewComponent', () => {
  let fixture: ComponentFixture<HomePageViewComponent>;
  let component: HomePageViewComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomePageViewComponent],
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
    const categoryImageLink: CategoryImageLink = { title: 't-shirts', category: 'clothes', subcategory: 't-shirts', imageUrl: '' };
    expect(component.getLink(categoryImageLink)).toEqual(
      `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${categoryImageLink.category}/${BgFashionPath.Subcategory}/${categoryImageLink.subcategory}`
    );
  });
});
