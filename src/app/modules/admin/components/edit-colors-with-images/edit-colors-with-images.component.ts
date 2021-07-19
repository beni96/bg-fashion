import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ColorWithImages } from 'src/app/common/interfaces/product';
import { COLOR_TYPES } from 'src/app/common/products/types';
import { getFormErrorMessages } from 'src/app/common/utils/utils';

type FIELD_NAME_TYPE = 'colors' | 'defaultColor';

@Component({
  selector: 'app-edit-colors-with-images',
  templateUrl: './edit-colors-with-images.component.html',
  styleUrls: ['./edit-colors-with-images.component.scss'],
})
export class EditColorsWithImagesComponent implements OnInit, OnChanges {
  @Input() colorsWithImages: ColorWithImages[];
  @Input() defaultColorIndex: number;

  form: FormGroup;
  formControls: { [key: string]: FormControl };
  imageUrlFormControls: { [key: string]: FormControl };
  fieldNames: FIELD_NAME_TYPE[] = ['colors', 'defaultColor'];
  errorMessages: { [key: string]: string } = {};

  constructor(private formbuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.colorsWithImages) {
      this.generateControls();
    }
  }

  ngOnInit() {
    this.generateControls();
  }

  generateControls() {
    const colorNames = this.colorsWithImages?.map((colorWithImages) => colorWithImages.color.name).join(',');
    this.formControls = {
      colors: this.formbuilder.control(colorNames, [Validators.required]),
      defaultColor: this.formbuilder.control(this.defaultColorIndex, []),
    };

    this.colorsWithImages.forEach((colorWithImages) => {
      const firstImageControl = this.formbuilder.control(colorWithImages.images[0], [Validators.required]);
      const secondImageControl = this.formbuilder.control(colorWithImages.images[1], [Validators.required]);
      this.formControls[colorWithImages.color.name + '1'] = firstImageControl;
      this.formControls[colorWithImages.color.name + '2'] = secondImageControl;
    });

    this.form = this.formbuilder.group(this.formControls);
  }

  getColorsOptions() {
    return COLOR_TYPES.map((colorType) => colorType.name);
  }

  getSelectedColors() {
    return this.formControls.colors.value ? this.formControls.colors.value.split(',') : [];
  }

  onColorOptionSelect(formControl: FormControl, value: string, resetFormControl: FormControl) {
    this.regenerateControls(formControl.value, value);
    formControl.setValue(value);
    resetFormControl.reset();
  }

  regenerateControls(oldValue: string, value: string) {
    // Color removed
    if (oldValue?.length > value.length) {
      const oldValuesArray = oldValue.split(',');
      const removedColor = oldValuesArray.find((newValue) => !value.includes(newValue));
      delete this.formControls[removedColor + '1'];
      delete this.formControls[removedColor + '2'];
    }
    // Color added
    if (oldValue?.length < value.length) {
      const newValuesArray = value.split(',');
      const addedColor = newValuesArray[newValuesArray.length - 1];
      this.formControls[addedColor + '1'] = this.formbuilder.control('', [Validators.required]);
      this.formControls[addedColor + '2'] = this.formbuilder.control('', [Validators.required]);
    }

    this.form = this.formbuilder.group(this.formControls);
  }

  isFormValid(): boolean {
    this.errorMessages = getFormErrorMessages(Object.keys(this.formControls), this.formControls, {});
    return this.form.valid;
  }

  getFormValues(): { colorsWithImages: ColorWithImages[]; defaultColorIndex: number } {
    const colorNamesArray = this.formControls.colors.value.split(',');
    const colorsWithImages = colorNamesArray.map((colorName) => {
      const color = COLOR_TYPES.find((colorType) => colorType.name === colorName);
      const img1 = this.formControls[colorName + '1'].value;
      const img2 = this.formControls[colorName + '2'].value;
      return { color, images: [img1, img2] };
    });
    return { colorsWithImages, defaultColorIndex: this.formControls.defaultColor.value };
  }
}
