import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaskPipe } from 'ngx-mask';
import { finalize } from 'rxjs';
import { AccessResponse } from 'src/app/core/models/access/access-response.model';
import { AccessService } from 'src/app/core/services/access/access.service';
import { AccessType } from 'src/app/shared/enums/access-type.enum';

@Component({
  selector: 'app-more-info.dialog',
  templateUrl: './more-info.dialog.component.html',
  styleUrls: ['./more-info.dialog.component.scss']
})
export class MoreInfoDialogComponent implements OnInit {


  form!: FormGroup;
  residentImage: string | null = null;
  access!: AccessResponse;
  loading = true;

  get Contacts(): FormArray {
    return this.form.get('contacts') as FormArray<FormGroup>;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      index: number
    },
    private _accessService: AccessService,
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _maskPipe: NgxMaskPipe
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getFullAccesById(this.data.index);
  }

  getFullAccesById(id: number) {
    this._accessService.getFullById(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe((result: AccessResponse) => {
        console.log(result);
        this.access = result;
        this.residentImage = result.resident.photoBase64 ? `data:image/jpeg;base64,${result.resident.photoBase64}` : null;
        this.form.patchValue({
          documentNumber: this._maskPipe.transform(this.access.resident.documentNumber, '000.000.000-00'),
          name: this.access.resident.name + ' ' + this.access.resident.lastName,
          local: this.access.place.placename,
          date: this._datePipe.transform(this.access.date, 'dd/MM/yyyy HH:mm:ss'),
          birthDate: this._datePipe.transform(this.access.resident.birthDate, 'dd/MM/yyyy'),
          accessType: this.access.accessType == AccessType.Entry ? "ENTRADA" : "SAÍDA",
          type: this.access.resident.type,
          hasPlace: !!this.access.resident.places[0],
          placeDescription: this.access.resident.places[0]?.placename,
          placeType: this.access.resident.places[0]?.type
        });

        this.form.disable();
    })
  }

  initForm() {
    this.form = this._fb.group({
      documentNumber: [''],
      name: [''],
      local: [''],
      date: [],
      birthDate: [''],
      accessType: [''],
      type: [''],
      placeId: [''],
      unitId: [''],
      photoBase64: [''],
      contacts: this._fb.array([
        this._fb.group({
          email: [''],
          phone: ['']
        })
      ]),
      hasToken: [],
      hasPlace: [],
      placeDescription: [],
      placeType: []
    });
  }
}
