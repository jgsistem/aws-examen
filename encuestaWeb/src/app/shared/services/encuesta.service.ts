import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../constants/constantes';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from 'src/app/models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  url = `${HOST_BACKEND}/api/votantes`;
  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<Encuesta[]>(`${this.url}/listar`);
  }

  registrar(data: Encuesta) {
    return this.http.post(`${this.url}/registrar`, data);
  }

  modificar(data: Encuesta) {
    return this.http.put(`${this.url}/modificar`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
