import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, SizesType } from 'src/app/common/interfaces/product';
import { getFormErrorMessages, getSizes } from 'src/app/modules/bg-fashion/common/utils';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { ProductsService } from 'src/app/services/products-service/products.service';

type FIELD_NAME_TYPE =
  | 'title'
  | 'subtitle'
  | 'price'
  | 'previousPrice'
  | 'sizes'
  | 'sizesType'
  | 'defaultColor'
  | 'categories'
  | 'subcategories';

const ERRORS_MESSAGES = {
  title: { minlength: 'At least 3 characters' },
  price: { pattern: 'Invalid price' },
  previousPrice: { pattern: 'Invalid price' },
};

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnChanges {
  @Input() product: Product;

  @Output() productChanged = new EventEmitter<Product>();
  @Output() productRemoved = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<Product>();

  form: FormGroup;
  formControls: { [key: string]: FormControl };
  fieldNames: FIELD_NAME_TYPE[] = [
    'title',
    'subtitle',
    'sizes',
    'sizesType',
    'defaultColor',
    'price',
    'previousPrice',
    'categories',
    'subcategories',
  ];
  errorMessages: { [key: string]: string } = {};

  constructor(
    private formbuilder: FormBuilder,
    private productsService: ProductsService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product) {
      this.generateControls();
    }
  }

  ngOnInit() {
    this.generateControls();
  }

  generateControls() {
    this.formControls = {
      title: this.formbuilder.control(this.product?.title, [Validators.required, Validators.minLength(3)]),
      subtitle: this.formbuilder.control(this.product?.subtitle, [Validators.required]),
      sizes: this.formbuilder.control(this.product?.sizes.toString(), [Validators.required]),
      sizesType: this.formbuilder.control(this.product?.sizesType, [Validators.required]),
      defaultColor: this.formbuilder.control(this.product?.defaultColorIndex, []),
      price: this.formbuilder.control(this.product?.price, [Validators.required]),
      previousPrice: this.formbuilder.control(this.product?.previousPrice, []),
      categories: this.formbuilder.control(this.product?.categories.toString(), [Validators.required]),
      subcategories: this.formbuilder.control(this.product?.subcategories.toString(), [Validators.required]),
    };

    this.form = this.formbuilder.group(this.formControls);
  }

  getSizeOptions() {
    return getSizes(this.formControls.sizesType.value);
  }

  getSizesTypeOptions() {
    return Object.values(SizesType);
  }

  getCategoryOptions() {
    return this.productsService.getCategories().concat('other');
  }

  getSubcategoryOptions() {
    let subcategories = [];
    const selectedCategories = this.formControls.categories.value?.split(',') || [];
    selectedCategories.forEach((category) => {
      subcategories = subcategories.concat(this.productsService.getSubcategories(category));
    });
    return [...new Set(subcategories)].concat('other');
  }

  showOtherCategoryInput() {
    return this.formControls.categories.value?.includes('other');
  }

  showOtherSubcategoryInput() {
    return this.formControls.subcategories.value?.includes('other');
  }

  onOptionSelect(formControl: FormControl, value: string, resetFormControl?: FormControl) {
    formControl.setValue(value);
    resetFormControl.reset();
  }

  onRemove() {
    this.productRemoved.emit();
    this.cartService.clearCache();
    this.favoritesService.clearCache();
  }

  onSave() {
    if (!this.form.valid) {
      this.errorMessages = getFormErrorMessages(this.fieldNames, this.formControls, ERRORS_MESSAGES);
      return;
    }

    const product: Product = {
      id: this.product?.id || Date.now(),
      title: this.formControls.title.value,
      subtitle: this.formControls.subtitle.value,
      price: this.formControls.price.value,
      previousPrice: this.formControls.previousPrice.value,
      sizes: this.formControls.sizes.value.split(','),
      categories: this.formControls.categories.value.split(','),
      subcategories: this.formControls.subcategories.value.split(','),
      colorsWithImages: this.product?.colorsWithImages || [],
    };

    this.product ? this.productChanged.emit(product) : this.productAdded.emit(product);
    this.cartService.clearCache();
    this.favoritesService.clearCache();
  }
}
