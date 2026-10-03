# Correio Digital — Portal de Notícias

Projeto front-end de um portal de notícias brasileiro, desenvolvido com **HTML, CSS e JavaScript puro**. O sistema reúne página inicial, editorias, páginas regionais, autenticação demonstrativa de usuários e um CMS administrativo local para cadastro e edição de notícias.

> **Aviso:** este é um projeto demonstrativo. Login, usuários, sessões e publicações são armazenados no `localStorage` do navegador e não devem ser usados como autenticação ou persistência de dados em produção.

## Funcionalidades

- Página inicial responsiva de portal de notícias.
- 7 editorias: **Brasil, Mundo, Economia, Esportes, Entretenimento, Tecnologia e Saúde**.
- Páginas regionais para **Norte, Nordeste, Centro-Oeste, Sudeste e Sul**.
- Cadastro e login demonstrativos.
- Sessão de usuário armazenada localmente no navegador.
- CMS administrativo para criar, editar, pesquisar e excluir notícias.
- Publicações do CMS integradas às páginas de categoria por `localStorage`.
- Previsão do tempo consumindo a API pública Open-Meteo.
- Sistema de edição do dia e elementos de interface/animações.
- Layout adaptável para diferentes tamanhos de tela.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Web Storage API (`localStorage`)
- Open-Meteo API
- Google Fonts

## Estrutura do projeto

```text
portal_noticias/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   ├── admin.css
│   │   ├── animacoes.css
│   │   ├── identidade.css
│   │   └── style.css
│   └── js/
│       ├── animacoes.js
│       ├── auth.js
│       ├── category.js
│       ├── clima.js
│       ├── cms.js
│       ├── edicao.js
│       ├── regions.js
│       └── script.js
└── pages/
    ├── admin/
    │   └── cms-admin.html
    ├── conta/
    │   ├── cadastro.html
    │   └── login.html
    ├── landing-pages/
    │   ├── brasil.html
    │   ├── economia.html
    │   ├── entretenimento.html
    │   ├── esportes.html
    │   ├── mundo.html
    │   ├── saude.html
    │   └── tecnologia.html
    └── regioes/
        ├── centro-oeste.html
        ├── nordeste.html
        ├── norte.html
        ├── regioes.html
        ├── sudeste.html
        └── sul.html
```

## Como executar

O projeto não exige instalação de dependências ou processo de build.

### Opção 1 — Abrir diretamente

Abra o arquivo `index.html` no navegador.

### Opção 2 — Servidor local (recomendado)

Na pasta do projeto, execute um servidor HTTP simples. Por exemplo, caso tenha Python instalado:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

Também é possível utilizar extensões como **Live Server** no Visual Studio Code.

## Acesso demonstrativo

### Usuário

O projeto cria automaticamente um usuário de demonstração quando necessário:

```text
E-mail: usuario@demo.com
Senha: 123456
```

Também é possível criar novos usuários pela página de cadastro. Os dados ficam salvos apenas no navegador atual.

### Administrador / CMS

Acesse:

```text
pages/admin/cms-admin.html
```

Credenciais de demonstração:

```text
E-mail: admin@demo.com
Senha: admin123
```

No CMS é possível adicionar, editar e remover notícias, definir categoria, status, resumo, imagem e link da publicação.

## Armazenamento local

O sistema utiliza as seguintes chaves no `localStorage`:

| Chave | Finalidade |
| --- | --- |
| `newsDemoUsers` | Usuários cadastrados |
| `newsDemoSession` | Sessão atual |
| `newsDemoPosts` | Notícias gerenciadas pelo CMS |
| `edicao` | Preferência da edição exibida |

Para reiniciar os dados demonstrativos, limpe o armazenamento local do site nas ferramentas do navegador.

## Previsão do tempo

O arquivo `assets/js/clima.js` consulta a API Open-Meteo para exibir informações meteorológicas. Por isso, essa funcionalidade necessita de conexão com a internet.

## Limitações atuais

Este projeto é exclusivamente front-end. Portanto:

- não existe banco de dados real;
- senhas ficam armazenadas localmente e sem criptografia;
- o CMS não possui autenticação segura de servidor;
- os dados não são sincronizados entre dispositivos ou navegadores;
- limpar o `localStorage` remove cadastros, sessões e alterações do CMS;
- imagens e links externos dependem da disponibilidade dos respectivos serviços.

## Próximas melhorias sugeridas

- Criar back-end com Node.js, PHP, Python ou outra tecnologia.
- Integrar banco de dados (PostgreSQL, MySQL, MongoDB etc.).
- Implementar autenticação segura com hash de senha e controle de sessão no servidor.
- Criar páginas individuais para cada notícia.
- Adicionar busca global de matérias.
- Implementar upload real de imagens.
- Adicionar perfis e permissões administrativas.
- Integrar uma API/CMS real para publicação de conteúdo.
- Adicionar testes automatizados e pipeline de deploy.

## Uso do projeto

O Correio Digital foi desenvolvido para fins de estudo, prototipação e demonstração de uma interface de portal jornalístico. Antes de utilizá-lo em produção, substitua os mecanismos demonstrativos de autenticação e armazenamento por uma arquitetura de back-end segura.
