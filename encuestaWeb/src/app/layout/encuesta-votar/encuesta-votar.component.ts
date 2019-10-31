import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EncuestaService } from 'src/app/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-votar',
  templateUrl: './encuesta-votar.component.html',
  styleUrls: ['./encuesta-votar.component.scss']
})
export class EncuestaVotarComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public service: EncuestaService
              ) {
  }

  ngOnInit() {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      profesion: new FormControl(null, Validators.required),
      lugarTrabajo: new FormControl(null, Validators.required),
      lenguaje: new FormControl(null, Validators.required)
    });
  }

  registrar() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.service.registrar(this.form.value).subscribe(() => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.form.reset();
      });
    }
  }
}
