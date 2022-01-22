import { MessagesService } from './../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { PlanetasService } from '../../services/planetas.service';
import swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';

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
  public sendFromId: number;
  public sendToId: number;
  public message: FormControl;
  private mdRef: NgbModalRef;
  public messages: any[] = [];

  constructor(private planetasService : PlanetasService, private modalService: NgbModal, private messageService: MessagesService) { }

  ngOnInit(): void {
    this.message = new FormControl("", [Validators.required, Validators.maxLength(100)]);
    this.sendToId = 0;
    this.sendFromId = 0;
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

  public sendMessage(): void {
    let body: any = {
      message: this.codeBinary(),
      planetMessageFromId: this.sendFromId,
      planetMessageToId: this.sendToId
    };
    this.messageService.sendMessage(body).subscribe(
      response => {
        swal.fire("¡Mensaje enviado!", "" , "success");
        this.ngOnInit();
        this.mdRef.close();
      },
      error => {
        swal.fire("¡Error!", "¡Upps ha ocurrido un error intentalo de nuevo por favor!", "error");
      }
    );
  }

  private codeBinary(): string {
    let messageCode: string = "";
    for(var i = 0; i < this.message.value.length; i ++) {
      messageCode += this.message.value.charCodeAt(i).toString(2) + " ";
    }
    return messageCode;
  }

  public selectSendMessageTo(content: any, sendToId: number): void {
    this.sendToId = sendToId;
    this.mdRef = this.modalService.open(content, {size:'lg'});
  }

  public selectSendMessageFrom(sendFromId: number): void {
    this.sendFromId = sendFromId;
  }

  public open(content, planeta: any) {
    this.planetaSelec = planeta;
    this.planetasService.updateContador(planeta.id).subscribe(
      response => {
        this.messageService.findAllMessagesSendTo(planeta.id).subscribe(
          response => {
            this.messages = response;
            this.ngOnInit();
            this.modalService.open(content, {size : "xl"});
          },
          error => {
            swal.fire("¡Upps ha ocurrido un error!", "", "error");
          }
        );
      },
      error => {
        console.log(error);
        swal.fire("¡Upps ha ocurrido un error!", "", "error");
      }
    );
  }

}
