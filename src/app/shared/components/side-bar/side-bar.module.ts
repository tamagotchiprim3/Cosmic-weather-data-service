import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberInputModule } from '../controls/number-input/input.module';
@NgModule({
  declarations: [SideBarComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NumberInputModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  exports: [SideBarComponent],
})
export class SideBarModule {}
