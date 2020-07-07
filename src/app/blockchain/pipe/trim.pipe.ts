import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trim' })
export class Trim implements PipeTransform {
    transform(str: string): string {
        const prefix = str.substring(0, 2);
        const suffix = str.substring(str.length - 5);
        return `${prefix}....${suffix}`;
    }
}
