# Mini App Telegram

Base estática, responsiva e mobile-first para um Web App do Telegram.

## Publicar com HTTPS

1. Importe esta pasta na Vercel, Netlify ou Cloudflare Pages.
2. Copie a URL HTTPS gerada.
3. No BotFather, abra `My Bots`, selecione seu bot, escolha `Bot Settings` e depois `Menu Button`.
4. Defina o texto do botão e informe a URL HTTPS.

## Testar localmente

Execute na pasta do projeto:

```powershell
python -m http.server 8080
```

Abra `http://localhost:8080` no navegador. O envio ao bot funciona somente quando o app é aberto pelo Telegram.

## Segurança

Este frontend não lê nem exibe nome, e-mail ou identificadores do usuário. Operações futuras de login, pedidos, saldo e pagamentos precisam enviar `Telegram.WebApp.initData` ao backend e validar a assinatura usando o token do bot. Nunca coloque o token do bot no frontend.
