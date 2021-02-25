import { Component, OnInit } from '@angular/core';
import { PlanetasService } from '../../services/planetas.service';
import swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.css']
})
export class PlanetasComponent implements OnInit {

  public planetasList: any[];
  public planetaSelec: any;
  public planetasTop3: any[];
  public primeroEnTop: any;

  constructor(private planetasService : PlanetasService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.planetasService.top3().subscribe(
      response => {
        if(this.planetasTop3 != null) {
          this.primeroEnTop = this.planetasTop3[0].datos.id;
        }
        this.planetasTop3 = [];
        let numero: number = 1;
        for(let planeta of response) {
          this.planetasTop3.push({
            posicion: numero,
            datos:planeta
          });
          numero ++;
        }
        if(this.primeroEnTop != null) {
          if(this.primeroEnTop != this.planetasTop3[0].datos.id) {
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
              title: this.planetasTop3[0].datos.nombre + " eres el nuevo top 1!"
            });
          }
        }
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );
    this.planetasService.getPlanetas().subscribe(
      response => {
        this.planetasList = response;
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );
  }

  public open(content, planeta: any) {
    this.planetaSelec = planeta;
    this.planetasService.updateContador(planeta.id).subscribe(
      response => {
        this.ngOnInit();
        this.modalService.open(content, {size : "xl"});
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );
  }

}
