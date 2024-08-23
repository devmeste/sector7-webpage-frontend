import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {

  @Output ( ) onFileUploaded = new EventEmitter<Int8Array>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const byteArray = new Int8Array(reader.result as ArrayBuffer);
        this.onFileUploaded.emit(byteArray);
      };

      reader.onerror = (error) => {
        console.error('Error al leer el archivo: ', error);
      };
    }
  }

  // downloadByteArrayAsText(byteArray: Uint8Array): void {
  //   const byteArrayString = Array.from(byteArray).join(', '); // Convertir el byteArray a un string separado por comas
  //   const blob = new Blob([byteArrayString], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'byteArray.txt';
  //   a.click();
  //   URL.revokeObjectURL(url); // Liberar el objeto URL
  // }

}
