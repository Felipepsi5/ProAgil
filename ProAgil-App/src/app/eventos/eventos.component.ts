import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento' ;
import { BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ElementSchemaRegistry } from '@angular/compiler';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],

})
export class EventosComponent implements OnInit {

  titulo = 'Eventos';

  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  modoSalvar = 'post';
  bodyDeletarEvento = '';
  mostrarImagem = false;
  registerForm: FormGroup;
  _filtroLista: string = '';
  fileNameToUpdate : string;
  dataAtual :string;

  file: File;

   constructor(
     private eventoService: EventoService,
     private modalService: BsModalService,
     private fb: FormBuilder,
     private localService: BsLocaleService,
     private toastr: ToastrService
     ){
       this.localService.use('pt-br');
      }
   get filtroLista(): string{
       return this._filtroLista;
   }
   set filtroLista(value: string){
       this._filtroLista = value;
       this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
   }

   openModal(template: any){
     this.registerForm.reset();
     template.show();
   }
  ngOnInit() {
    this.validation();
    this.getEventos();
  }
  editarEvento(evento: Evento, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = Object.assign({}, evento);
    this.fileNameToUpdate = evento.imageURL.toString();
    this.evento.imageURL = '';
    this.registerForm.patchValue(this.evento);
  }
   novoEvento(template: any){
     this.modoSalvar = 'post';
     this.openModal(template);
   }
   excluirEvento(evento: Evento, template: any){
     this.openModal(template);

     this.evento = evento;
     this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema} -  Codigo: ${evento.id}`;
   }
   confirmeDelete(template: any){
     this.eventoService.deleteEvento(this.evento.id).subscribe(
       () => {
         template.hide();
         this.getEventos();
         this.toastr.success('Deletado com Sucesso!');
       }, error =>{
        this.toastr.error('Erro ao tentar Deletar');
         console.log(error);
       }
     )
   }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }
  validation(){
    this.registerForm = this.fb.group({
         tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         local: ['', [Validators.required]],
         dataEvento: ['', [Validators.required]],
         qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
         imageURL: ['', [Validators.required]],
         telefone: ['', [Validators.required]],
         email: ['', [Validators.required, Validators.email]]
    });
  }

  uploadImagem(){
    if(this.modoSalvar == 'post'){
       const nomeArquivo = this.evento.imageURL.split('\\',3);
       this.evento.imageURL = nomeArquivo[2];
       this.eventoService.postUpload(this.file, nomeArquivo[2]).subscribe(
         () => {
           this.dataAtual = new Date().getDate().toString()
           this.getEventos();
         }
       );
    }
    else
    {
      this.evento.imageURL = this.fileNameToUpdate;
      this.eventoService.postUpload(this.file, this.fileNameToUpdate).subscribe(
        () => {
          this.dataAtual = new Date().getDate().toString()
          this.getEventos();

        }
      );
    }

  }
  onFileChange(event) {
     const reader = new FileReader();
     if(event.target.files && event.target.files.length){
           this.file = event.target.files;
           console.log(this.file);
     }
  }

  salvarAlteracao(template: any){
    if (this.registerForm.valid){
      if(this.modoSalvar == 'post'){
       this.evento = Object.assign({}, this.registerForm.value);
       this.uploadImagem();
       this.eventoService.postEvento(this.evento).subscribe(
        (novoEvento: Evento) => {
          console.log(novoEvento);
          template.hide();
          this.getEventos();
          this.toastr.success('Inserido com Sucesso!');
        }, error => {
          console.log(error);
          this.toastr.error('Erro ao tentar inserir');
        }
       );
      }
       else{
           this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
           this.uploadImagem();

           this.eventoService.putEvento(this.evento).subscribe(
            () => {
              template.hide();
              this.getEventos();
              this.toastr.success('Editado com sucesso!');
            }, error => {
              console.log(error);
              this.toastr.error(`Erro ao Editar' ${error}`);
            }
          );
       }
     }
  }
  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }
  getEventos(){
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) =>{
       this.eventos = _eventos;
       this.eventosFiltrados = this.eventos;
      }, error=>{
        this.toastr.error(`Erro ao tentar carregar eventos' ${error}`);
      }
    );
  }

}
