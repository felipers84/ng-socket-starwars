import { Component } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Mensagem } from './mensagem.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketService]
})
export class AppComponent {
  title = 'front';

  mensagens = new Array<Mensagem>();
  novaMensagem = '';
  duracaoMensagemTelaEmSegundos = 30;

  constructor(private websocketService: WebSocketService) {
    websocketService.subMensagens.subscribe(mensagem => this.mensagens.push(mensagem));
  }

  public inserirMensagem() {
    this.mensagens.push({ mensagem: this.novaMensagem, dataHoramensagem: new Date() });
    this.websocketService.enviarMensagem(this.novaMensagem);
    this.novaMensagem = '';
    setTimeout(() => this.mensagens.splice(0), this.duracaoMensagemTelaEmSegundos * 1000);

  }
}
