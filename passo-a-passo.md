# Passo a passo
- Nova solução `ng new ng-websocket-sw`
  - Selecione para utilizar angular routing
- O `app.component` será utilizado para o display do texto
  - Criar um `<p>` com classe 'paragrafo'
    - Colocar texto dummy
  - Criar uma `<div class="camada-gradiente">`
  - Abrir o `app.component.scss` para adicionar e definir o fundo preto e o estilo do parágrafo
  
```scss
$amarelo-star-wars: #ffd700;

:host {
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rolling-paragraph {
  text-align: justify;
  position: absolute;
  bottom: 0;
  margin-left: -9em;
  left: 50%;
  width: 18em;
  color: $amarelo-star-wars;
  font-weight: bold;
  transform-origin: 50% 100%;
  transform: perspective(300px) rotateX(25deg);
}

@keyframes scroll {
  0% {
    top: 100vh;
  }
  100% {
    top: -100vh;
  }
}

.camada-gradiente {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: linear-gradient( black 50%, transparent 100%);
}
```
- Criar interface Mensagem

```typescript
export interface Mensagem {
  mensagem: string;
  dataHoramensagem: Date;
}
```
- Em `app.component` criar método de `EnviarMensagem`, criando o array de mensagens

```typescript
  public inserirMensagem(msg: String) {
    this.mensagens.push({ mensagem: this.novaMensagem, dataHoramensagem: new Date() });
    setTimeout(() => this.mensagens.splice(0), this.duracaoMensagemTelaEmSegundos * 1000);
    //this.websocketService.enviarMensagem(this.novaMensagem);
  }
```

  - Criar um `<textarea>` e um botão:
```html
<textarea [(ngModel)]="texto" #txtArea rows="4" cols="100">Teste</textarea>
<br>
<button (click)="enviarTexto(txtArea.value); txtArea.value = ''">ENVIAR TEXTO</button>%
```
- `ng g s websocket-client`

```typescript
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
```

- `ng g c terminal`
