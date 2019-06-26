import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../_services/evento.service';
import { BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventoEdit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {
  titulo = 'Editar Evento'
  registerForm: FormGroup;
  evento = {};
  imagemURL = 'assets/img/upload.png';
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService
    ){
      this.localService.use('pt-br');
     }
  ngOnInit() {
    this.validation();
  }
  validation(){
    this.registerForm = this.fb.group({
         tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         local: ['', [Validators.required]],
         dataEvento: ['', [Validators.required]],
         qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
         imageURL: [''],
         telefone: ['', [Validators.required]],
         email: ['', [Validators.required, Validators.email]],
         lotes: this.fb.array([this.criaLote()]),
         redesSociais: this.fb.array([this.criaRedeSocial()])
    });
  }

  criaLote(): FormGroup{
    return  this.fb.group({
      nome: ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      dataInicio:['', Validators.required],
      dataFim:['', Validators.required]
    });
  }
  criaRedeSocial(): FormGroup{
    return this.fb.group({
      nome: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  onFileChange(file: FileList){
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemURL = event.target.result;
    reader.readAsDataURL(file[0]);
  }



}
