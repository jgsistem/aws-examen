import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/models/encuesta';
import { EncuestaService } from 'src/app/shared';
import Swal from 'sweetalert2';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.scss']
})
export class EncuestaListarComponent implements OnInit {
  form: FormGroup;
  encuestas: Encuesta[] = [];
  total = 0;
  page = 0;
  pageSize = 5;
  closeResult: string;
  constructor(private formBuilder: FormBuilder,
              public service: EncuestaService,
              private modalService: NgbModal,
              config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(null),
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      profesion: new FormControl(null, Validators.required),
      lugarTrabajo: new FormControl(null, Validators.required),
      lenguaje: new FormControl(null, Validators.required)
    });
  }

  listar() {
    this.service.listar().subscribe((data: Encuesta[]) => {
      this.encuestas = data;
      this.total = data.length;
    });
  }

  modificar() {
    if (this.form.valid) {
      this.service.modificar(this.form.value).subscribe(() => {
        this.modalService.dismissAll();
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.listar();
      });
    }
  }

  elimnar(data: Encuesta) {
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: 'No podras revertirlo!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(data.id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El registro fue eliminado correctamente.',
            'success'
          );
          this.listar();
        });
      }
    });
  }

  open(content, encuesta?: Encuesta) {
    if (encuesta != null) {
        this.form.setValue(encuesta);
    } else {
        this.iniciarForm();
    }
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}

}
