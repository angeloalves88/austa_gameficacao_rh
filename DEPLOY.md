# Deploy e troubleshooting - Saúde Premiada

## Diagnóstico do 404

Execute estes comandos na VPS para identificar o problema:

### 1. Verificar se as labels foram aplicadas corretamente
```bash
docker inspect score-saude-rh | grep -A 30 "Labels"
```
Confira se `Host(austa_rh.dafetech.com.br)` aparece nas labels (o `${APP_DOMAIN}` deve ter sido substituído).

### 2. Verificar se o container está na rede traefik
```bash
docker network inspect traefik | grep -A 5 score-saude
```

### 3. Testar o container diretamente (bypass Traefik)
```bash
docker run --rm -p 8888:80 --name teste-score $(docker images -q austa_gameficacao_rh-score-saude) 
```
Depois acesse `http://IP_DA_VPS:8888` — se funcionar, o problema está no Traefik.

### 4. Verificar os entrypoints do Traefik
No painel do Traefik (geralmente em :8080) ou no docker-compose do Traefik, veja os nomes dos entrypoints. Podem ser `web`/`websecure` ou `http`/`https`.

## Se o Traefik usar entrypoints diferentes

Se seu Traefik usa `http` e `https` em vez de `web` e `websecure`, edite o `docker-compose.yml` e troque:
- `web` → `http`
- `websecure` → `https`

## Domínio com underscore

O domínio `austa_rh.dafetech.com.br` contém underscore (`_`). Tecnicamente isso é inválido em DNS. Considere usar `austa-rh.dafetech.com.br` (com hífen).

## Uso com Portainer

Se estiver usando Portainer (Stack): nas configurações da Stack, adicione a variável de ambiente `APP_DOMAIN` = `austa_rh.dafetech.com.br` (ou use "Load from .env file" se o projeto foi clonado com o `.env`).

## Rebuild após alterações

```bash
docker compose down
docker compose up -d --build
```
