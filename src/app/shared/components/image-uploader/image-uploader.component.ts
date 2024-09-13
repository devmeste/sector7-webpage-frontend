import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [MatIcon,NgClass],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

  //show the last image name that was uploaded
  selectedFileName: string = '';

  @Output() onFileUploaded = new EventEmitter<number[]>();
  @Input() clearFileNameSignal!: boolean;

  // Handle if its necesary to disable the button
  @Input() disabled: boolean = false;
  @Input() disabledText: string = '';


  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    // const file = event.target.files[0];

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        this.selectedFileName = file.name;
      }
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const byteArray = new Int8Array(reader.result as ArrayBuffer);
        const byteArray2 = Array.from(byteArray);
        this.onFileUploaded.emit(byteArray2);
      };

      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error);
      };
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearFileNameSignal'] && changes['clearFileNameSignal'].currentValue) {
      this.selectedFileName = '';
    }
  }



  // Método para manejar la selección del archivo
  // onFileSelected(event: any): void {

  // }

  // Método para simular el clic en el input de archivo


}
