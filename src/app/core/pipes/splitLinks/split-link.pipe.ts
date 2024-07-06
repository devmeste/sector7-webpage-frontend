import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitLink',
  standalone: true
})
export class SplitLinkPipe implements PipeTransform {

  transform(link: string): string {
    let img = link.split('!&!').pop();
    console.log(img);
    if (img) {
      return img;
    } else {
      return "undefined";
    }
  }

}
