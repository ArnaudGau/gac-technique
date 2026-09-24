# GAC Technique

Application TypeScript basée sur Remix 3, exécutable localement ou avec Docker.

> Remix 3 est actuellement distribué en version release candidate. Le projet a été généré avec le CLI officiel `remix@next`.

## Prérequis

- Docker avec Docker Compose
- `make` (optionnel, les commandes Docker équivalentes restent utilisables)
- Node.js 24 uniquement pour une exécution sans Docker

## Démarrage avec Docker

```sh
make dev
```

L'application est alors disponible sur <http://localhost:44100>. Les fichiers du projet sont montés dans le conteneur et Remix recharge automatiquement le serveur et le navigateur lors d'une modification.

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
make test       # lancer les tests
make typecheck  # vérifier les types TypeScript
make doctor     # vérifier la configuration Remix
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
npm run hmr
```

`npm run dev` surveille et redémarre uniquement le serveur. `npm run hmr` active en plus le rechargement à chaud côté navigateur. Remix 3 exécute directement les modules TypeScript et ne requiert pas de phase de compilation séparée pour ce projet.

## Structure

- `app/routes.ts` définit les routes.
- `app/router.ts` relie les routes, middlewares et contrôleurs.
- `app/actions/` contient les contrôleurs et les vues.
- `app/assets.ts` configure le pipeline des assets.
- `server.ts` démarre le serveur HTTP.
- `hmr.ts` démarre l'environnement de développement avec HMR.
