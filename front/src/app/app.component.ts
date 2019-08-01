import {Component} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {Mensagem} from './mensagem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketService]
})
export class AppComponent {
  title = 'front';

  mensagens = new Array<Mensagem>();

  constructor(private websocketService: WebSocketService) {
    websocketService.subMensagens.subscribe(mensagem => this.mensagens.push(mensagem));
  }

  public enviarMensagem(msg: string) {

    this.websocketService.enviarMensagem(msg);
  }
}
