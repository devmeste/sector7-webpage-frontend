import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'replaceChar',
    standalone: true
})
export class ReplaceCharPipe implements PipeTransform{
    
    transform(value: any, toReplace: string, replaceWith: string): string {
        return value.replaceAll(toReplace, replaceWith);
    }
}