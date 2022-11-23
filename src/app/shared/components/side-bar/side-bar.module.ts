import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AutocompleteInputModule } from '../controls/autocomplete-input/autocomplete-input.module';
import { InputModule } from '../controls/number-input/input.module';
import { SideBarComponent } from './side-bar.component';
@NgModule({
  declarations: [SideBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    MatDividerModule,
    AutocompleteInputModule,
  ],
  exports: [SideBarComponent],
})
export class SideBarModule {}
