import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { AccessResponse } from 'src/app/core/models/access/access-response.model';
import { FastAccessRequest } from 'src/app/core/models/access/fast-access.model';
import { PlaceResponse } from 'src/app/core/models/place/place-reponse.model';
import { HeaderService } from 'src/app/core/services';
import { AccessService } from 'src/app/core/services/access/access.service';
import { FileService } from 'src/app/core/services/file/file.service';
import { PlaceService } from 'src/app/core/services/place/place.service';
import { SnackBarService } from 'src/app/core/services/snack/snack.service';
import { ACCESSTYPES_OPTIONS } from 'src/app/shared/constants/select-options.const';
import { AccessType } from 'src/app/shared/enums/access-type.enum';

@Component({
  selector: 'app-fast-access',
  templateUrl: './fast-access.component.html',
  styleUrls: ['./fast-access.component.scss']
})
export class FastAccessComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  capturedImage: Blob | null = null;
  options = ACCESSTYPES_OPTIONS;
  form!: FormGroup;
  hideVideo: boolean = false;
  placeOptions: { name: string, value: string }[] = [];
  residentLastAccess!: AccessResponse;
  places: PlaceResponse[] = [];

  get Contacts(): FormArray {
    return this.form.get('contacts') as FormArray<FormGroup>;
  }

  constructor(
    private _fb: FormBuilder,
    private _header: HeaderService,
    private _placeService: PlaceService,
    private _accessService: AccessService,
    private _fileService: FileService,
    private _snack: SnackBarService,
    private _router: Router
  ) { }


  ngAfterViewInit(): void {
    this.startCamera();
  }


  ngOnInit(): void {
    this._header.changeTitle({ title: 'Informe os dados para liberar o acesso' });
    this.initForm();
    this.getAllPlaces();
    this.subscribeToDocumentNumber();
    this.subscribeToPlaceValueChanges();
  }
  subscribeToPlaceValueChanges() {
    this.form.get('placeId')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap((value: string) => {
          let selectedPlace = this.places.find(place => place.id == +value);
          this.form.get('unitId')?.patchValue(selectedPlace?.unitId);
        }))
      .subscribe();
  }

  subscribeToDocumentNumber() {
    this.form.get('documentNumber')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        map((documentNumber: string) => documentNumber.trim()),
        filter((documentNumber: string) => documentNumber.length > 10),
        switchMap(documentNumber => this._accessService.getLastAccessByDocumentNumber(documentNumber)))
      .subscribe((access: AccessResponse) => {
        if (access) {
          this.residentLastAccess = access;
          this.handleLastAccess(access);
        }
      });
  }

  handleLastAccess(access: AccessResponse): void {
    this.form.patchValue({
      name: access.resident.name,
      lastName: access.resident.lastName,
      birthDate: access.resident.birthDate,
      documentNumber: access.resident.documentNumber,
      type: access.resident.type.toString(),
      accessType: access.accessType == AccessType.Exit ? AccessType.Entry.toString() : AccessType.Exit.toString(),
      placeId: access.place.id.toString(),
      unitId: access.place.unitId.toString(),
      contacts: [
        {
          email: access.resident.contacts[0].email,
          phone: access.resident.contacts[0].phone
        }
      ]
    }, { emitEvent: false, onlySelf: true });
  };

  getAllPlaces() {
    this._placeService.getAllPlaces()
      .subscribe((places: PlaceResponse[]) => {
        this.places = places;
        this.placeOptions = places.map(place => {
          return { name: place.placename, value: place.id.toString() };
        })
    });
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      })
      .catch(err => {
        console.error("Erro ao acessar a câmera: ", err);
      });
  }

  capture() {
    this.video.nativeElement.pause()
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.context.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.canvas.nativeElement.toBlob((blob: Blob | null) => {
      if (blob) {
        let file = this.blobToFile(blob, new Date().toISOString());
        this._fileService.fileToBase64(file)
        .subscribe((base64String: string) => {
            this.form.get('photoBase64')?.patchValue(base64String);
        });
      }
    }, 'image/png');
  }

  blobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now()
    });
    return file;
  }

  initForm() {
    this.form = this._fb.group({
      documentNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      accessType: [0],
      type: ['', [Validators.required]],
      placeId: ['', [Validators.required]],
      unitId: ['', [Validators.required]],
      photoBase64: [''],
      contacts: this._fb.array([
        this._fb.group({
          email: ['', [Validators.required]],
          phone: ['', [Validators.required]]
        })
      ])
    });
  }

  navigateBack(): void {
    window.history.back();
  }

  onSubmit(): void {
    if (this.form.value) {
      let fastAccess = this.form.value as FastAccessRequest;
      fastAccess.accessType = +fastAccess.accessType;

      this._accessService.insertFastAccess(fastAccess)
        .subscribe((result: AccessResponse) => {
          this._snack.showSuccess('Acesso liberado');
          this._router.navigate(['internal', 'main']);
      });
    }
  }
}
