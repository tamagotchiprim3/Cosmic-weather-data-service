import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchInputModule } from '../controls/search-input/search-input.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
