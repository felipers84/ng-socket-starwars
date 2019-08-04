# Passo a passo
- Nova solução `ng new ng-websocket-sw`
  - Selecione para utilizar angular routing
- O `app.component` será utilizado para o display do texto
  - Criar um `<p>` com classe `paragrafo`
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

.paragrafo {
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
- Em `app.component` criar método de `enviarMensagem`, criando o array de mensagens

```typescript
  mensagens = new Array<Mensagem>();
  
  public enviarMensagem(msg: String) {
    this.mensagens.push({ mensagem: this.novaMensagem, dataHoramensagem: new Date() });
    setTimeout(() => this.mensagens.splice(0), this.duracaoMensagemTelaEmSegundos * 1000);
    //this.websocketService.enviarMensagem(this.novaMensagem);
  }
```

  - Criar um `<textarea>` e um botão:
```html
<textarea #txtArea rows="4" cols="100">Teste</textarea>
<br>
<button (click)="enviarMensagem(txtArea.value); txtArea.value = ''">ENVIAR TEXTO</button>
```
- `ng g s websocket-client`

- Atualizar o `app.component.ts`
```typescript
  duracaoMensagemTelaEmSegundos = 30;

  constructor(private websocketService: WebSocketService) {
    websocketService.subMensagens.subscribe(mensagem => this.mensagens.push(mensagem));
  }

  public enviarMensagem() {
    this.websocketService.enviarMensagem(this.novaMensagem);
  }
}
```

- `ng g c terminal`
  - Migrar o código do enviarMensagem para esta tela, assim como o textarea e o button
