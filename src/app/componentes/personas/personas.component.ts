import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  public personasList: any[];
  public personaDetalle: any;
  public personasTop3: any[] = null;
  public primeroEnTop: number = null;

  constructor(private personasService : PersonasService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.personasService.getTop3().subscribe(
      response => {
        if(this.personasTop3 != null) {
          this.primeroEnTop = this.personasTop3[0].datos.id;
        }
        this.personasTop3 = [];
        let numero: number = 1;
        for(let persona of response) {
          this.personasTop3.push({
            posicion: numero,
            datos:persona
          });
          numero ++;
        }
        if(this.primeroEnTop != null) {
          if(this.primeroEnTop != this.personasTop3[0].datos.id) {
            swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
              }
            }).fire({
              icon: "warning",
              title: this.personasTop3[0].datos.nombre + " " + this.personasTop3[0].datos.apellido + " eres el nuevo top 1!"
            });
          }
        }
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );
    this.personasService.getPersonas().subscribe(
      response => {
        this.personasList = response;
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );
  }

  public open(content, persona: any) {
    this.personasService.updateContador(persona.id).subscribe(
      response => {
        this.ngOnInit();
        this.personaDetalle = persona;
        this.modalService.open(content, {size : "lg"});
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );

  }

}
