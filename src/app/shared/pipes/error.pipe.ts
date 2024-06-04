import { Pipe, PipeTransform } from '@angular/core';

export const ERROR_MESSAGES: { [error: string]: string } = {
  required: "Este campo é obrigatório",
};

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {
  transform(values: any,): string[] {
    return Object.keys(values).map(key => ERROR_MESSAGES[key]);
  }
}
