# Semantix
## Descrição
 O projeto possui duas funcionalidas

### 1. Automatizar o consumo de dados em **XML** da **API** [API Tech](https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/docs#authentication) e converter esses dados para **JSON**, veja abaixo um exemplo de um usuários e seus dados em **XML** e depois em **JSON**.

 ~~~~xml
<data>
    <pagination>
        <page>1</page>
        <limit>1</limit>
    </pagination>
    <usersList type="array">
        <item>
            <createdAt>2022-02-23T05:20:06.524Z</createdAt>
            <firstName>Nakia</firstName>
            <avatar>https://cdn.fakercloud.com/avatars/al_li_128.jpg</avatar>
            <email>Melissa.Stamm84@hotmail.com</email>
            <lastName>Towne</lastName>
            <id>1</id>
        </item>
    </usersList>
</data>

<data type="array">
    <item>
        <street>Halvorson Turnpike</street>
        <city>Wunschfort</city>
        <state>Illinois</state>
        <zipcode>93067-6844</zipcode>
        <country>Gibraltar</country>
        <number type="num">35</number>
        <countryCode>AW</countryCode>
        <id>1</id>
        <userId>1</userId>
    </item>
    <item>
        <street>Balistreri Junction</street>
        <city>Redlands</city>
        <state>New York</state>
        <zipcode>98391-4627</zipcode>
        <country>Palau</country>
        <number type="num">31</number>
        <countryCode>PL</countryCode>
        <id>56</id>
        <userId>1</userId>
    </item>
</data>

<data type="array">
    <item>
        <name>Kate Jacobi</name>
        <phoneNumber>(964) 313-0384 x5699</phoneNumber>
        <email>Kendra31@yahoo.com</email>
        <id>8</id>
        <userId>8</userId>
    </item>
</data>
 ~~~~

 ~~~~json
{
    "fullName": "Nakia Towne",
    "email": "Melissa.Stamm84@hotmail.com",
    "address": "Halvorson Turnpike",
    "addressNumber": "35",
    "phoneNumber": "(964) 313-0384 x5699"
  }
 ~~~~
### 2. Iniciar um API para fazer a gestão das pastar do site [GoFile](https://gofile.io/). As rotas disponíveis são, criar pasta, fazer upload de um arquivo e deletar uma pasta ou arquivo. **Obs caso a pasta não tenha sido criado o não poderá ser feito o uploa do arquivo**

## Detalhes de como montar o ambiente
* Instalar o Node JS caso não tenha, [Node JS link](https://nodejs.org/en/download/package-manager/)
* Versão do Node JS utilizada: 16.15.0
* Pode ser usado o NPM ou YARN para gerenciar o node_modules
* Instalar o Docker [Docker link](https://docs.docker.com/desktop/install/windows-install/)
* Instalar o Docker composer [Docker Compose Link](https://docs.docker.com/compose/install/)
* Caso não queira instalar o Docker, pode ser usado um servidor do [MongoDB](https://www.mongodb.com/), basta criar um conta grátis
* Efetue a instalação do **node_modules** usando **npm install** ou **yarn**
* Execute o commando **npx run mongo:up** ou **yarn mongo:up** para criar o container do **MongoDB**
* Preencha o dados no arquivo **.env** para poder acessar as **APIs**
* Execute o commando **npx run test** ou **yarn test** para verificar se está tudo funcionando
* O projeto possui um arquivo JSON do Postman com os rotas de teste da [API Tech](https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/docs#authentication), [GoFile API](https://gofile.io/api) e o servidor Node JS

## Detalhes sobre a automação
  * Execute o comando **npx run dev:script** ou **yarn dev:script**
  * O script consume 30 dados dps espera 1min e consume mais 30, repete esse processo até não ter mais dados na [API Tech](https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/docs#authentication)
  * Os dados são salvos no **MongoDB**

## Detalhes sobre a API para gerenciar pastas
  * Executar o comando **npx run dev:server** ou **yarn dev:server** para iniciar o servidor
  * O servidor possui rotas para criar pastas, deletar, ou procurar
  * O Projeto possui um arquivo JSON do Postman com as rotas da API
  * Respostas de Sucesso
    * true
    * Status Code 200 ou 201 para criação de arquivo
  * Respostas de Erro
    * messagem(String)
    * Status Code 404 (conteúdo não encontrado)
    * Status Code 400 (parâmetros faltando)
    * Status Code 500 para erro interno


## Estrura base do projeto
  * A **main** dentro da **src** inicia tanto a automação quanto o servidor
  * A pasta **infra** contém as aplicações de terceiros
  * A pasta **core** contém as regras de negócio, como as entidades do banco de dados
  * A pasta **app** contém as regras da aplicação, como o gerenciamento de quais classes vão ser chamadas e formatação de dados

### Erro encontrado
  * A [API Tech](https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/docs#authentication) as vezes gera um erro no redis de setex paramêtro invalido, pode ser na hora que o registro de limite de requisições é atualizado
  * A [API Tech](https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/docs#authentication) retorna um erro 404 as vezes, pode ser algum erro na hora de redirionar para rota

### Coisas faltando
  * Um sistema para gerênciar os erros quando estão sendo consumidos dos dados da [API Tech](https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/docs#authentication)
  * Enviar os dados convertidos para JSON para o [GoFile](https://gofile.io/)
  * API Swagger para uma visualização mais fácil das rotas