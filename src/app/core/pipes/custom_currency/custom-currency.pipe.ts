import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$'): string {
    if (value == null) return '';

    // Convert the number to a string with two decimal places
    let formattedValue = value.toFixed(2);
    
    // Replace the dot with a comma for the decimal part
    formattedValue = formattedValue.replace('.', ',');

    // Add thousand separators
    const parts = formattedValue.split(',');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    const integerWithThousandSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${currencySymbol} ${integerWithThousandSeparators},${decimalPart}`;
  }
}