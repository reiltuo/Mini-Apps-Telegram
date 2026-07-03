# Mini Apps Telegram, guia completo de configuração e deploy

Esta pasta possui dois projetos independentes:

1. `miniapp-assinatura`: tela de perfil, catálogo, planos, PIX e ofertas.
2. `miniapp-chat`: conversa programada, escolha de horário, PIX e ofertas automáticas.

As duas pastas ficam juntas em um único repositório do GitHub. Na Vercel, esse mesmo repositório deve ser importado duas vezes, escolhendo uma pasta raiz diferente em cada projeto. Assim, cada Mini App terá seu próprio domínio.

## 1. Personalizar antes da publicação

### Mini App de assinatura

Abra `miniapp-assinatura\index.html` e altere:

* `Nome do perfil`
* `@seuusuario`
* Quantidade de fotos e vídeos
* Descrição do perfil
* Nomes, descrições e preços dos planos
* Textos dos descontos e ofertas finais

Coloque as novas mídias em `miniapp-assinatura\assets` usando estes nomes:

* `profile.jpeg`: foto quadrada do perfil
* `banner.mp4`: vídeo horizontal do banner
* `catalogo-1.mp4`: primeiro vídeo
* `catalogo-2.mp4`: segundo vídeo
* `catalogo-3.mp4`: terceiro vídeo
* `catalogo-foto.jpg`: foto do catálogo

Depois, em `index.html`, substitua os placeholders:

```html
<video class="cover-video" src="assets/banner.mp4" autoplay muted loop playsinline preload="metadata"></video>
<img class="avatar" src="assets/profile.jpeg" alt="Foto de perfil">
```

Nos três vídeos do catálogo, adicione respectivamente:

```html
src="assets/catalogo-1.mp4"
src="assets/catalogo-2.mp4"
src="assets/catalogo-3.mp4"
```

Na foto do catálogo, use:

```html
src="assets/catalogo-foto.jpg"
```

O limite de reprodução das prévias está em `app.js`:

```js
const CATALOG_PREVIEW_SECONDS = 3;
```

### Mini App de conversa

Abra `miniapp-chat\index.html` e altere:

* `Nome do contato`
* Título e descrição da oferta
* Textos da confirmação de idade, quando necessário

Substitua `miniapp-chat\assets\profile-placeholder.svg` por sua foto e altere o HTML para:

```html
<img src="assets/profile.jpeg" alt="Foto de perfil">
```

Abra `miniapp-chat\app.js` e altere:

* As três mensagens do bloco `scripts`
* O valor principal `3990`, equivalente a R$ 39,90
* O primeiro desconto `1995`, equivalente a R$ 19,95
* O desconto final `998`, equivalente a R$ 9,98
* Os textos das ofertas
* Os tempos `30_000` e `120_000`, medidos em milissegundos

Os valores enviados pelo navegador também precisam existir em `api\pix\create.js`. Isso impede que alguém altere o preço pelo navegador.

## 2. Criar a conta no GitHub

1. Acesse `https://github.com`.
2. Clique em criar conta.
3. Informe e-mail, senha e nome de usuário.
4. Confirme o e-mail recebido.
5. Ative a autenticação em dois fatores nas configurações de segurança.

## 3. Criar o repositório

Crie um único repositório, por exemplo `Mini-Apps-Telegram`, contendo as duas pastas:

* `miniapp-assinatura`
* `miniapp-chat`

No GitHub:

1. Clique no sinal de adição no canto superior direito.
2. Selecione `New repository`.
3. Digite o nome.
4. Escolha `Private` se não quiser expor o código.
5. Não marque criação automática de README, `.gitignore` ou licença, porque as pastas já possuem arquivos.
6. Clique em `Create repository`.

## 4. Enviar os dois Mini Apps ao GitHub

Copie a URL HTTPS do repositório e execute no PowerShell a partir da pasta que contém os dois projetos:

```powershell
Set-Location "CAMINHO\PARA\Mini Apps Modelo"
git init
git branch -M main
git add .
git commit -m "Adicionar modelos e guia de configuração"
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
3. Autorize a Vercel a acessar os repositórios.
4. No painel, clique em `Add New` e depois em `Project`.
5. Localize `Mini-Apps-Telegram` e clique em `Import`.
6. Em `Root Directory`, escolha `miniapp-assinatura`.
7. Não é necessário configurar comando de build para este projeto.
8. Antes do primeiro deploy, adicione as variáveis descritas na próxima seção.
9. Clique em `Deploy`.
10. Importe o mesmo repositório novamente para criar outro projeto.
11. No segundo projeto, escolha `miniapp-chat` em `Root Directory`.

Cada projeto da Vercel gerará um endereço HTTPS diferente. Todo novo `git push` na branch `main` atualizará os projetos vinculados automaticamente.

## 6. Criar as credenciais na NexusPag

1. Crie ou acesse sua conta na NexusPag.
2. Conclua as verificações de conta exigidas pelo gateway.
3. Abra `Dashboard`, `Integrações` e `API Keys`.
4. Gere uma API key.
5. Copie a chave e guarde em local seguro. Ela será usada como `NEXUSPAG_API_KEY`.
6. Abra `Dashboard`, `Integrações` e `Webhooks`.
7. Crie ou copie o webhook secret. Ele será usado como `NEXUSPAG_WEBHOOK_SECRET`.

A API key e o webhook secret são credenciais diferentes:

* API key: autoriza a criação e consulta de cobranças.
* Webhook secret: valida se uma notificação de pagamento realmente veio da NexusPag.

Nunca coloque nenhuma dessas credenciais em `index.html`, `app.js`, GitHub ou mensagens do Telegram.

## 7. Adicionar as variáveis na Vercel

Faça em cada um dos dois projetos:

1. Abra o projeto na Vercel.
2. Entre em `Settings`.
3. Abra `Environment Variables`.
4. Crie `NEXUSPAG_API_KEY` e cole a API key como valor.
5. Crie `NEXUSPAG_WEBHOOK_SECRET` e cole o webhook secret como valor.
6. Marque pelo menos `Production`. Para testar previews, marque também `Preview`.
7. Salve.
8. Abra `Deployments` e faça um redeploy do último deployment.

Variáveis novas não alteram deployments antigos. Um novo deploy é obrigatório.

## 8. Configurar o webhook da NexusPag

O código envia automaticamente a URL do webhook ao criar cada cobrança. A URL tem este formato:

```text
https://SEU-DOMINIO.vercel.app/api/webhooks/nexuspag
```

Se o painel da NexusPag solicitar uma URL global, configure a URL acima para cada projeto. Cada Mini App deve usar o seu próprio domínio.

O webhook usa os cabeçalhos `x-nexuspag-signature` e `x-nexuspag-timestamp` e valida o HMAC com `NEXUSPAG_WEBHOOK_SECRET`.

## 9. Testar o PIX

1. Abra o domínio da Vercel.
2. Clique na oferta e gere um PIX.
3. Confirme se aparecem QR Code e código Copia e Cola.
4. Faça uma cobrança de teste com valor baixo quando o gateway permitir.
5. Verifique se o status muda para pago.
6. Na Vercel, abra `Logs` e confirme que o webhook respondeu com status HTTP 200.

Se aparecer `NEXUSPAG_API_KEY não configurada`, a variável não foi criada no ambiente correto ou ainda não houve redeploy.

Se a cobrança for criada, mas o webhook retornar 401, confira o `NEXUSPAG_WEBHOOK_SECRET` e se a NexusPag está enviando os cabeçalhos de assinatura e timestamp.

## 10. Criar o bot no BotFather

Esta etapa é necessária para o Mini App de assinatura. O Mini App de conversa pode continuar como site comum em seu próprio domínio.

1. No Telegram, abra somente o bot verificado `@BotFather`.
2. Envie `/newbot`.
3. Informe o nome exibido do bot.
4. Informe um username terminado em `bot`.
5. Guarde o token entregue pelo BotFather em local seguro. O modelo atual não precisa desse token no frontend.
6. Use `/setuserpic` para colocar a foto do bot.
7. Use `/setdescription` para definir a descrição maior mostrada antes da conversa.
8. Use `/setabouttext` para definir o texto curto da bio.

## 11. Colocar o botão principal no perfil do bot

Esse é o botão grande que aparece no perfil como `Abrir app` ou `Launch app`.

1. Abra `@BotFather`.
2. Entre em `My Bots`.
3. Escolha o bot.
4. Abra `Bot Settings`.
5. Abra `Configure Mini App` ou `Main Mini App`.
6. Configure o domínio HTTPS do projeto `miniapp-assinatura` publicado na Vercel.
7. Informe título, descrição curta e demais dados solicitados.
8. Salve.

Depois disso, o perfil do bot passa a exibir um botão principal para abrir o Mini App. O BotFather também pode permitir o envio de imagens e vídeos de demonstração para o perfil.

## 12. Colocar o botão ao lado do teclado

Esse é o botão de menu próximo ao campo de mensagem.

1. No `@BotFather`, envie `/setmenubutton`.
2. Escolha o bot.
3. Envie o texto do botão, por exemplo `ASSINAR`.
4. Envie a URL HTTPS do `miniapp-assinatura` na Vercel.

Também é possível chegar à mesma opção por `My Bots`, seu bot, `Bot Settings` e `Menu Button`.

Feche e abra novamente a conversa com o bot para atualizar a interface. Em alguns aparelhos pode ser necessário encerrar e reabrir o Telegram.

## 13. Atualizar os sites depois de publicados

Depois de editar qualquer arquivo, publique novamente com:

```powershell
Set-Location "CAMINHO-DO-PROJETO"
git add .
git commit -m "Atualizar Mini App"
git push origin main
```

A Vercel detectará o novo commit e fará o deploy automaticamente.

## 14. Lista final de conferência

* Nenhuma mídia antiga permanece nas pastas.
* Nome, username, descrições e mensagens foram personalizados.
* Preços do HTML ou `app.js` correspondem aos preços permitidos em `api\pix\create.js`.
* Os dois Mini Apps estão no mesmo repositório, em pastas separadas.
* O repositório foi importado duas vezes na Vercel.
* Cada projeto da Vercel usa a pasta raiz correta.
* `NEXUSPAG_API_KEY` foi adicionada somente na Vercel.
* `NEXUSPAG_WEBHOOK_SECRET` foi adicionado somente na Vercel.
* Foi realizado um novo deploy depois de criar as variáveis.
* Geração, cópia e confirmação do PIX foram testadas.
* O botão principal do perfil aponta para o Mini App de assinatura.
* O botão ao lado do teclado aponta para o mesmo domínio HTTPS.

Use somente mídias autorizadas, informe corretamente o que está sendo vendido e cumpra as regras do Telegram, da Vercel, do gateway e a legislação aplicável.

## Documentação oficial

* GitHub: `https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account`
* Repositórios GitHub: `https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository`
* Vercel e Git: `https://vercel.com/docs/deployments/overview`
* Variáveis da Vercel: `https://vercel.com/docs/environment-variables`
* NexusPag: `https://nexuspag.com/docs`
* Telegram Mini Apps: `https://core.telegram.org/bots/webapps`
