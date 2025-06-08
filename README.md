# Blog do Professor Gabriel Ramos

Projeto de blog educacional criado com [Docusaurus](https://docusaurus.io/). Inclui uma interface administrativa simples que permite criar e editar posts em Markdown diretamente pelo navegador.

## Objetivos
- Compartilhar artigos sobre educação e tecnologia.
- Demonstrar um exemplo de personalização do Docusaurus com páginas e componentes React.
- Disponibilizar uma área administrativa sem backend para testes locais.

## Instalação
1. Certifique‑se de ter **Node.js 18+** instalado.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   O blog ficará disponível em `http://localhost:3000`.

## Estrutura de Diretórios
```
├── blog/                 # Posts em Markdown e arquivo de autores
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── admin/        # Componentes da interface administrativa
│   ├── pages/            # Páginas do site (home, redes sociais, admin)
│   └── css/              # Estilos globais (custom.css)
├── static/
│   └── img/uploads/      # Imagens enviadas pelo admin
├── docusaurus.config.js  # Configuração do Docusaurus
├── Dockerfile            # Construção da imagem Docker
├── docker-compose.yml    # Orquestração opcional
└── package.json
```

## Docker
Para gerar e executar uma imagem com o site estático:
```bash
# Construir a imagem
docker build -t gabriel-blog .

# Rodar o contêiner
docker run --rm -p 3000:3000 gabriel-blog
```
Também é possível utilizar o `docker-compose`:
```bash
docker-compose up --build
```

## Licença
Conteúdo distribuído sob a licença MIT.

## Contato
[professorgabrielramos.com](https://professorgabrielramos.com)
