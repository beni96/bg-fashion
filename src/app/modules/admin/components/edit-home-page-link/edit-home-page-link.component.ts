import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CategoryLink } from 'src/app/common/interfaces/category-link';
import { ProductsService } from 'src/app/services/products-service/products.service';

type FIELD_NAME_TYPE = 'url' | 'title' | 'category' | 'subcategory';

const URL_FORMAT = "^(?:http(s)?:\\/\\/)?[\\w-]+(?:\\.[\\w\\.-]+)+[\\w-\\._~:/?#[\\]@!%$&'\\(\\)\\*\\+,;=.]+$";

const ERRORS_MESSAGES = {
  url: { required: 'Required', pattern: 'Invalid url' },
};

@Component({
  selector: 'app-edit-home-page-link',
  templateUrl: './edit-home-page-link.component.html',
  styleUrls: ['./edit-home-page-link.component.scss'],
})
export class EditHomePageLinkComponent implements OnInit, OnChanges {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() category: string;
  @Input() subcategory: string;
  @Output() categoryLinkChanged = new EventEmitter<CategoryLink>();

  form: FormGroup;
  formControls: Record<FIELD_NAME_TYPE, FormControl>;
  fieldNames: FIELD_NAME_TYPE[] = ['url', 'title', 'category', 'subcategory'];
  showErrors = false;

  constructor(private formbuilder: FormBuilder, private productsService: ProductsService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.imageUrl && !changes.imageUrl.isFirstChange()) || (changes.title && !changes.title.isFirstChange())) {
      this.generateControls();
    }
  }

  ngOnInit() {
    this.generateControls();
  }

  generateControls() {
    this.formControls = {
      url: this.formbuilder.control(this.imageUrl, [Validators.required, Validators.pattern(URL_FORMAT)]),
      title: this.formbuilder.control(this.title, []),
      category: this.formbuilder.control(this.category, []),
      subcategory: this.formbuilder.control(this.subcategory, []),
    };

    this.form = this.formbuilder.group(this.formControls);
  }

  getImageUrlErrorMessage() {
    const fieldErrorNames = Object.keys(this.formControls.url.errors || {});
    const errorName = fieldErrorNames[0];
    return this.showErrors ? ERRORS_MESSAGES.url[errorName] : '';
  }

  getCategoryOptions() {
    return this.productsService.getCategories();
  }

  getSubcategoryOptions() {
    return this.productsService.getSubcategories(this.formControls.category.value).concat('');
  }

  onSave() {
    if (!this.form.valid) {
      this.showErrors = true;
      return;
    }

    this.categoryLinkChanged.emit({
      imageUrl: this.formControls.url.value,
      title: this.formControls.title.value,
      category: this.formControls.category.value,
      subcategory: this.formControls.subcategory.value,
    });
  }
}
