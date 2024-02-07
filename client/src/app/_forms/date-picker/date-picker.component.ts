import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  today = new Date();
  minDate = { year: this.today.getFullYear() - 100, month: this.today.getMonth() + 1, day: this.today.getDate() };
  maxDate = { year: this.today.getFullYear() - 18, month: this.today.getMonth() + 1, day: this.today.getDate() };

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }

  get control(): FormControl {
    return this.ngControl.control as FormControl
  }

}
