# GAC Technique

Application React et TypeScript construite avec Vite, exécutable localement ou avec Docker.

## Prérequis

- Docker avec Docker Compose
- `make` (optionnel, les commandes Docker équivalentes restent utilisables)
- Node.js 20 ou plus récent uniquement pour une exécution sans Docker

## Démarrage avec Docker

```sh
make dev
```

L'application est alors disponible sur <http://localhost:44100>. Les fichiers du projet sont montés dans le conteneur et Vite recharge automatiquement le navigateur lors d'une modification.

Pour afficher les logs :

```sh
make logs
```

Pour arrêter l'environnement :

```sh
make down
```

Sans Makefile, les commandes équivalentes sont :

```sh
docker compose up --build -d
docker compose logs -f app
docker compose down
```

Le port peut être changé côté machine hôte :

```sh
APP_PORT=3000 make dev
```

## Commandes utiles

```sh
make help       # afficher toutes les commandes
make typecheck  # vérifier les types TypeScript
make shell      # ouvrir un shell dans le conteneur
make clean      # supprimer les conteneurs et le volume node_modules
```

## Image de production

```sh
make build
make start
```

L'image finale n'embarque que les dépendances de production et s'exécute avec l'utilisateur non privilégié `node`.

## Exécution sans Docker

```sh
npm install
npm run dev
```

L'application est disponible sur <http://localhost:44100>.

## Structure

- `src/main.tsx` monte l'application React dans la page.
- `src/App.tsx` contient le premier composant et la liste de questions.
- `src/index.css` contient les styles globaux minimaux.
- `vite.config.ts` configure Vite et son plugin React.

Les anciens fichiers Remix sont conservés temporairement dans `app/` afin de ne pas perdre le travail précédent, mais ils ne font plus partie du build.
