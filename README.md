# Score Saúde Corporativo

Portal de gamificação para gestão de saúde corporativa, desenvolvido para gestores de RH.

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Recharts (gráficos)
- Lucide React (ícones)
- react-big-calendar
- date-fns

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Build

```bash
npm run build
```

## Deploy na Vercel

1. Faça push do projeto para um repositório Git (GitHub, GitLab ou Bitbucket)
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "Add New Project" e importe o repositório
4. A Vercel detectará automaticamente o projeto Vite
5. Clique em "Deploy"

O arquivo `vercel.json` já está configurado para SPA (rewrites para index.html).

## Deploy na VPS (Docker + Traefik)

1. Crie o arquivo `.env` na raiz do projeto:
   ```
   APP_DOMAIN=score.seudominio.com.br
   ```

2. Na VPS (ou via Portainer), execute:
   ```bash
   docker compose up -d --build
   ```

3. Configure o DNS: aponte o domínio configurado em `APP_DOMAIN` para o IP da sua VPS.

4. Certifique-se de que a rede `traefik` existe:
   ```bash
   docker network create traefik
   ```
