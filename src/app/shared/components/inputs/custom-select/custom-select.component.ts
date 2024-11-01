import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {

  @Input( {required: true}) items!: string[];
  @Output() selectedOption = new EventEmitter<string>();

  itemSelected: string = '';
  isDropdownOpen: boolean = false;

  selectOption(option: string) {
    this.itemSelected = option;
    this.selectedOption.emit(option);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


}
