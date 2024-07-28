import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculatePrice',
  standalone: true,
})
export class CalculatePricePipe implements PipeTransform {
  transform(value: number, args: number): unknown {
    // console.log(value);
    // console.log(value - (args / 100) * value);
    return (value - (args / 100) * value).toFixed(2);
  }
}
