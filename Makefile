.DEFAULT_GOAL := help

COMPOSE := docker compose

.PHONY: help install dev dev-logs stop down restart shell typecheck build start logs clean

help: ## Afficher les commandes disponibles
	@awk 'BEGIN {FS = ":.*## "; printf "Utilisation : make <commande>\n\n"} /^[a-zA-Z_-]+:.*## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Installer les dépendances localement
	npm install

dev: ## Lancer React avec Vite dans Docker
	$(COMPOSE) up --build -d

dev-logs: ## Lancer Remix au premier plan avec les logs
	$(COMPOSE) up --build

stop: ## Arrêter les conteneurs sans les supprimer
	$(COMPOSE) stop

down: ## Arrêter et supprimer les conteneurs
	$(COMPOSE) down

restart: ## Redémarrer le service de développement
	$(COMPOSE) restart app

shell: ## Ouvrir un shell dans le conteneur
	$(COMPOSE) exec app sh

typecheck: ## Vérifier les types TypeScript dans Docker
	$(COMPOSE) run --rm app npm run typecheck

build: ## Construire l'image Docker de production
	docker build --target production -t gac-technique:latest .

start: ## Lancer l'image de production sur APP_PORT (44100 par défaut)
	docker run --rm --init -p $${APP_PORT:-44100}:44100 gac-technique:latest

logs: ## Suivre les logs du service de développement
	$(COMPOSE) logs -f app

clean: ## Supprimer les conteneurs et le volume des dépendances
	$(COMPOSE) down --volumes --remove-orphans
