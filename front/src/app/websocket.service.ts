import {WebSocketSubject} from 'rxjs/webSocket';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Mensagem} from './mensagem.model';


@Injectable()
export class WebSocketService {
  private socket: WebSocketSubject<Mensagem>;

  public subMensagens: Subject<Mensagem>;


  constructor() {
    // O construtor com o overload de WebSocketSubjectOptions pode ter definido seu resultSelector que é o responsável por dar override no comportamento padrão do JSON.parse ao receber mensagens (quando recebemos uma string pura, por exemplo)
    // this.socket = new WebSocketSubject({
    //   url: 'ws://localhost:8765',
    //   resultSelector: msg => msg.data
    // });

    this.socket = new WebSocketSubject<Mensagem>('ws://localhost:8765');

    this.subMensagens = new Subject<Mensagem>();
    console.log('Inicializado');


    this.socket.subscribe(mensagem => {
      console.log('chegou mensagem', mensagem);
      this.subMensagens.next(mensagem);
    }, err => console.error(err), () => console.log('Completado'));

  }

  enviarMensagem(mensagem: string) {
    this.socket.next({dataHoramensagem: new Date(), mensagem});
  }

}
