import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

  @Output ( ) onFileUploaded = new EventEmitter<number[]>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
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


}
