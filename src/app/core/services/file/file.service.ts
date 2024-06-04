import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileService {
  constructor() { }

  /**
   * Função para disponibilizar o download de um arquivo através dos parâmetros passados ao mesmo.
   * Caso o arquivo for Blob, a função irá somente disponibilizar o download do mesmo.
   * Caso o arquivo for string (base64), a função irá converter em BLOB e em seguida, disponibilizar o download do mesmo.
   * @param filename Nome do arquivo que será disponibilizado.
   * @param file Arquivo que será disponibilizado, podendo ser Blob ou string (base64)
   * @param fileType Tipo do arquivo: application/xml, application/pdf, etc..
   */
  downloadFile(filename: string, file: Blob | string, fileType: string): void {
    if (typeof file == 'string')
      file = this.convertToBlob(file, fileType);

    let url = window.URL.createObjectURL(file);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * Converte um arquivo no formato string (base64) em um objeto Blob.
   * @param b64File Arquivo string (base64) que será convertido
   * @param fileType Tipo do arquivo para conversão: application/xml, application/pdf, etc..
   */
  convertToBlob(b64File: string, fileType: string): Blob {
    const BYTEARRAY = new Uint8Array(
      atob(b64File)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    return new Blob([BYTEARRAY], { type: fileType });
  }

  /**
   * Método para realizar converção de File para Base64.
   * @param {File} file - Arquivo para converter em Base64.
   * @returns {Blob} -  Arquivo em tipo Blob.
   */
  fileToBlob(file: File): Blob {
    return new Blob([file], { type: file.type });
  }

  /**
   * Método para realizar converção de File para Base64.
   * @param {File} file - Arquivo para converter em Base64.
   * @returns {Observable<string>} -  Observable do arquivo base64.
   */
  fileToBase64(file: File): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = (<string>reader.result).replace('data:', '').replace(/^.+,/, '');
        observer.next(base64String);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      // Limpeza do Observable quando for descartado
      return () => {
        reader.abort();
      };
    });
  }

  // Função para calcular o tamanho de um arquivo base64
  getBase64FileSize(base64String: string): number {
    // Remove o cabeçalho 'data:' do formato base64, se presente
    const base64WithoutHeader = base64String.split(',')[1] || base64String;

    // Calcula o tamanho do arquivo base64 dividindo o comprimento da string por 1.37
    // (4/3, pois cada caractere base64 codifica 6 bits)
    const padding = (base64WithoutHeader.endsWith('==') ? 2 : base64WithoutHeader.endsWith('=') ? 1 : 0);
    const lengthWithoutPadding = base64WithoutHeader.length - padding;
    return Math.floor(lengthWithoutPadding / 1.37);
  }
}
