# Mini Apps Telegram, guia completo de configuraÃ§Ã£o e deploy

Esta pasta possui dois projetos independentes:

1. `miniapp-assinatura`: tela de perfil, catÃ¡logo, planos, PIX e ofertas.
2. `miniapp-chat`: conversa programada, escolha de horÃ¡rio, PIX e ofertas automÃ¡ticas.

As duas pastas ficam juntas em um Ãºnico repositÃ³rio do GitHub. Na Vercel, esse mesmo repositÃ³rio deve ser importado duas vezes, escolhendo uma pasta raiz diferente em cada projeto. Assim, cada Mini App terÃ¡ seu prÃ³prio domÃ­nio.

## 1. Personalizar antes da publicaÃ§Ã£o

### Mini App de assinatura

Abra `miniapp-assinatura\index.html` e altere:

* `Nome do perfil`
* `@seuusuario`
* Quantidade de fotos e vÃ­deos
* DescriÃ§Ã£o do perfil
* Nomes, descriÃ§Ãµes e preÃ§os dos planos
* Textos dos descontos e ofertas finais

Coloque as novas mÃ­dias em `miniapp-assinatura\assets` usando estes nomes:

* `profile.jpeg`: foto quadrada do perfil
* `banner.mp4`: vÃ­deo horizontal do banner
* `catalogo-1.mp4`: primeiro vÃ­deo
* `catalogo-2.mp4`: segundo vÃ­deo
* `catalogo-3.mp4`: terceiro vÃ­deo
* `catalogo-foto.jpg`: foto do catÃ¡logo

Depois, em `index.html`, substitua os placeholders:

```html
<video class="cover-video" src="assets/banner.mp4" autoplay muted loop playsinline preload="metadata"></video>
<img class="avatar" src="assets/profile.jpeg" alt="Foto de perfil">
```

Nos trÃªs vÃ­deos do catÃ¡logo, adicione respectivamente:

```html
src="assets/catalogo-1.mp4"
src="assets/catalogo-2.mp4"
src="assets/catalogo-3.mp4"
```

Na foto do catÃ¡logo, use:

```html
src="assets/catalogo-foto.jpg"
```

O limite de reproduÃ§Ã£o das prÃ©vias estÃ¡ em `app.js`:

```js
const CATALOG_PREVIEW_SECONDS = 3;
```

### Mini App de conversa

Abra `miniapp-chat\index.html` e altere:

* `Nome do contato`
* TÃ­tulo e descriÃ§Ã£o da oferta
* Textos da confirmaÃ§Ã£o de idade, quando necessÃ¡rio

Substitua `miniapp-chat\assets\profile-placeholder.svg` por sua foto e altere o HTML para:

```html
<img src="assets/profile.jpeg" alt="Foto de perfil">
```

Abra `miniapp-chat\app.js` e altere:

* As trÃªs mensagens do bloco `scripts`
* O valor principal `3990`, equivalente a R$ 39,90
* O primeiro desconto `1995`, equivalente a R$ 19,95
* O desconto final `998`, equivalente a R$ 9,98
* Os textos das ofertas
* Os tempos `30_000` e `120_000`, medidos em milissegundos

Os valores enviados pelo navegador tambÃ©m precisam existir em `api\pix\create.js`. Isso impede que alguÃ©m altere o preÃ§o pelo navegador.

## 2. Criar a conta no GitHub

1. Acesse `https://github.com`.
2. Clique em criar conta.
3. Informe e-mail, senha e nome de usuÃ¡rio.
4. Confirme o e-mail recebido.
5. Ative a autenticaÃ§Ã£o em dois fatores nas configuraÃ§Ãµes de seguranÃ§a.

## 3. Criar o repositÃ³rio

Crie um Ãºnico repositÃ³rio, por exemplo `Mini-Apps-Telegram`, contendo as duas pastas:

* `miniapp-assinatura`
* `miniapp-chat`

No GitHub:

1. Clique no sinal de adiÃ§Ã£o no canto superior direito.
2. Selecione `New repository`.
3. Digite o nome.
4. Escolha `Private` se nÃ£o quiser expor o cÃ³digo.
5. NÃ£o marque criaÃ§Ã£o automÃ¡tica de README, `.gitignore` ou licenÃ§a, porque as pastas jÃ¡ possuem arquivos.
6. Clique em `Create repository`.

## 4. Enviar os dois Mini Apps ao GitHub

Copie a URL HTTPS do repositÃ³rio e execute no PowerShell a partir da pasta que contÃ©m os dois projetos:

```powershell
Set-Location "$HOME\Desktop\Mini Apps Modelo"
git init
git branch -M main
git add .
git commit -m "Adicionar modelos e guia de configuraÃ§Ã£o"
git remote add origin https://github.com/SEU-USUARIO/Mini-Apps-Telegram.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo nome real da conta. Se o Git pedir identidade, execute uma vez:

```powershell
git config --global user.name "SEU NOME"
git config --global user.email "SEU EMAIL DO GITHUB"
```

## 5. Criar a conta e importar na Vercel

1. Acesse `https://vercel.com`.
2. Crie a conta usando `Continue with GitHub`.
3. Autorize a Vercel a acessar os repositÃ³rios.
4. No painel, clique em `Add New` e depois em `Project`.
5. Localize `Mini-Apps-Telegram` e clique em `Import`.
6. Em `Root Directory`, escolha `miniapp-assinatura`.
7. NÃ£o Ã© necessÃ¡rio configurar comando de build para este projeto.
8. Antes do primeiro deploy, adicione as variÃ¡veis descritas na prÃ³xima seÃ§Ã£o.
9. Clique em `Deploy`.
10. Importe o mesmo repositÃ³rio novamente para criar outro projeto.
11. No segundo projeto, escolha `miniapp-chat` em `Root Directory`.

Cada projeto da Vercel gerarÃ¡ um endereÃ§o HTTPS diferente. Todo novo `git push` na branch `main` atualizarÃ¡ os projetos vinculados automaticamente.

## 6. Criar as credenciais na NexusPag

1. Crie ou acesse sua conta na NexusPag.
2. Conclua as verificaÃ§Ãµes de conta exigidas pelo gateway.
3. Abra `Dashboard`, `IntegraÃ§Ãµes` e `API Keys`.
4. Gere uma API key.
5. Copie a chave e guarde em local seguro. Ela serÃ¡ usada como `NEXUSPAG_API_KEY`.
6. Abra `Dashboard`, `IntegraÃ§Ãµes` e `Webhooks`.
7. Crie ou copie o webhook secret. Ele serÃ¡ usado como `NEXUSPAG_WEBHOOK_SECRET`.

A API key e o webhook secret sÃ£o credenciais diferentes:

* API key: autoriza a criaÃ§Ã£o e consulta de cobranÃ§as.
* Webhook secret: valida se uma notificaÃ§Ã£o de pagamento realmente veio da NexusPag.

Nunca coloque nenhuma dessas credenciais em `index.html`, `app.js`, GitHub ou mensagens do Telegram.

## 7. Adicionar as variÃ¡veis na Vercel

FaÃ§a em cada um dos dois projetos:

1. Abra o projeto na Vercel.
2. Entre em `Settings`.
3. Abra `Environment Variables`.
4. Crie `NEXUSPAG_API_KEY` e cole a API key como valor.
5. Crie `NEXUSPAG_WEBHOOK_SECRET` e cole o webhook secret como valor.
6. Marque pelo menos `Production`. Para testar previews, marque tambÃ©m `Preview`.
7. Salve.
8. Abra `Deployments` e faÃ§a um redeploy do Ãºltimo deployment.

VariÃ¡veis novas nÃ£o alteram deployments antigos. Um novo deploy Ã© obrigatÃ³rio.

## 8. Configurar o webhook da NexusPag

O cÃ³digo envia automaticamente a URL do webhook ao criar cada cobranÃ§a. A URL tem este formato:

```text
https://SEU-DOMINIO.vercel.app/api/webhooks/nexuspag
```

Se o painel da NexusPag solicitar uma URL global, configure a URL acima para cada projeto. Cada Mini App deve usar o seu prÃ³prio domÃ­nio.

O webhook usa os cabeÃ§alhos `x-nexuspag-signature` e `x-nexuspag-timestamp` e valida o HMAC com `NEXUSPAG_WEBHOOK_SECRET`.

## 9. Testar o PIX

1. Abra o domÃ­nio da Vercel.
2. Clique na oferta e gere um PIX.
3. Confirme se aparecem QR Code e cÃ³digo Copia e Cola.
4. FaÃ§a uma cobranÃ§a de teste com valor baixo quando o gateway permitir.
5. Verifique se o status muda para pago.
6. Na Vercel, abra `Logs` e confirme que o webhook respondeu com status HTTP 200.

Se aparecer `NEXUSPAG_API_KEY nÃ£o configurada`, a variÃ¡vel nÃ£o foi criada no ambiente correto ou ainda nÃ£o houve redeploy.

Se a cobranÃ§a for criada, mas o webhook retornar 401, confira o `NEXUSPAG_WEBHOOK_SECRET` e se a NexusPag estÃ¡ enviando os cabeÃ§alhos de assinatura e timestamp.

## 10. Criar o bot no BotFather

Esta etapa Ã© necessÃ¡ria para o Mini App de assinatura. O Mini App de conversa pode continuar como site comum em seu prÃ³prio domÃ­nio.

1. No Telegram, abra somente o bot verificado `@BotFather`.
2. Envie `/newbot`.
3. Informe o nome exibido do bot.
4. Informe um username terminado em `bot`.
5. Guarde o token entregue pelo BotFather em local seguro. O modelo atual nÃ£o precisa desse token no frontend.
6. Use `/setuserpic` para colocar a foto do bot.
7. Use `/setdescription` para definir a descriÃ§Ã£o maior mostrada antes da conversa.
8. Use `/setabouttext` para definir o texto curto da bio.

## 11. Colocar o botÃ£o principal no perfil do bot

Esse Ã© o botÃ£o grande que aparece no perfil como `Abrir app` ou `Launch app`.

1. Abra `@BotFather`.
2. Entre em `My Bots`.
3. Escolha o bot.
4. Abra `Bot Settings`.
5. Abra `Configure Mini App` ou `Main Mini App`.
6. Configure o domÃ­nio HTTPS do projeto `miniapp-assinatura` publicado na Vercel.
7. Informe tÃ­tulo, descriÃ§Ã£o curta e demais dados solicitados.
8. Salve.

Depois disso, o perfil do bot passa a exibir um botÃ£o principal para abrir o Mini App. O BotFather tambÃ©m pode permitir o envio de imagens e vÃ­deos de demonstraÃ§Ã£o para o perfil.

## 12. Colocar o botÃ£o ao lado do teclado

Esse Ã© o botÃ£o de menu prÃ³ximo ao campo de mensagem.

1. No `@BotFather`, envie `/setmenubutton`.
2. Escolha o bot.
3. Envie o texto do botÃ£o, por exemplo `ASSINAR`.
4. Envie a URL HTTPS do `miniapp-assinatura` na Vercel.

TambÃ©m Ã© possÃ­vel chegar Ã  mesma opÃ§Ã£o por `My Bots`, seu bot, `Bot Settings` e `Menu Button`.

Feche e abra novamente a conversa com o bot para atualizar a interface. Em alguns aparelhos pode ser necessÃ¡rio encerrar e reabrir o Telegram.

## 13. Atualizar os sites depois de publicados

Depois de editar qualquer arquivo, publique novamente com:

```powershell
Set-Location "CAMINHO-DO-PROJETO"
git add .
git commit -m "Atualizar Mini App"
git push origin main
```

A Vercel detectarÃ¡ o novo commit e farÃ¡ o deploy automaticamente.

## 14. Lista final de conferÃªncia

* Nenhuma mÃ­dia antiga permanece nas pastas.
* Nome, username, descriÃ§Ãµes e mensagens foram personalizados.
* PreÃ§os do HTML ou `app.js` correspondem aos preÃ§os permitidos em `api\pix\create.js`.
* Os dois Mini Apps estÃ£o no mesmo repositÃ³rio, em pastas separadas.
* O repositÃ³rio foi importado duas vezes na Vercel.
* Cada projeto da Vercel usa a pasta raiz correta.
* `NEXUSPAG_API_KEY` foi adicionada somente na Vercel.
* `NEXUSPAG_WEBHOOK_SECRET` foi adicionado somente na Vercel.
* Foi realizado um novo deploy depois de criar as variÃ¡veis.
* GeraÃ§Ã£o, cÃ³pia e confirmaÃ§Ã£o do PIX foram testadas.
* O botÃ£o principal do perfil aponta para o Mini App de assinatura.
* O botÃ£o ao lado do teclado aponta para o mesmo domÃ­nio HTTPS.

Use somente mÃ­dias autorizadas, informe corretamente o que estÃ¡ sendo vendido e cumpra as regras do Telegram, da Vercel, do gateway e a legislaÃ§Ã£o aplicÃ¡vel.

## DocumentaÃ§Ã£o oficial

* GitHub: `https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account`
* RepositÃ³rios GitHub: `https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository`
* Vercel e Git: `https://vercel.com/docs/deployments/overview`
* VariÃ¡veis da Vercel: `https://vercel.com/docs/environment-variables`
* NexusPag: `https://nexuspag.com/docs`
* Telegram Mini Apps: `https://core.telegram.org/bots/webapps`

