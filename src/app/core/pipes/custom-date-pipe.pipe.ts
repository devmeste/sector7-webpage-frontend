import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date): string {

    const date = new Date(value);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    console.log(date);

    console.log(value);

    console.log(day);

    return `${day}/${month}/${year}`;
  }

}
