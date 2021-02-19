
# View.in

Mais simples que clicar em link encurtado. O view.in é um encurtador de links criado com typescript, express, postgres, :coffee: e :heart:.

## How it works
Sua URL original será armazenada no Postgres em conjunto com um hash indexado e criado utilizando o [nanoid](https://github.com/ai/nanoid), possibilitando o uso de hashes curtos, performáticos e com baixa chance de colisão, isso pode facilmente ser verificado [aqui](https://zelark.github.io/nano-id-cc/).

## Prerequisites

 - NodeJS
 - Docker

## Usage

Instalação das dependências necessárias

    npm i
Execução do docker-compose para disponibilizar o postgres e o pgadmin

    docker-compose up -d
Edição do arquivo de variáveis de ambiente

    cp .env.template .env

Execução da aplicação

    npm start

Execução dos testes

    npm test
## TODOS

 - Documentar a API utilizando Swagger UI e [tsoa](https://github.com/lukeautry/tsoa)
 - Usar [winston](https://github.com/winstonjs/winston) para melhorar o rollout de logs
 - Adicionar plugin de coverage e testes

## Contributing

 - Faça o fork do projeto
 - Não se esqueça de instalar os plugins necessários pra manter o padrão de código (**eslint, editorconfig**)
 - Crie uma branch e inicie suas alterações
 - Abra PR e aguarde a revisão
 - Parabéns (e obrigado :smile:)! Seu PR será aprovado
