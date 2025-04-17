.PHONY: build start stop restart bash logs install test test-all test-e2e test-cov style

# Variables
DOCKER_COMPOSE = docker compose

.DEFAULT_GOAL := deploy

deploy: build

build:
	@echo "📦 Building"
	$(DOCKER_COMPOSE) build
	make start
	make install

start:
	@echo "🚀 Deploy!!!"
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

restart:
	$(DOCKER_COMPOSE) restart

bash:
	$(DOCKER_COMPOSE) exec app sh

logs:
	$(DOCKER_COMPOSE) logs -f

install:
	@echo "📦 Installing dependencies"
	$(DOCKER_COMPOSE) exec app npm install

test-all: test test-e2e
test:
	$(DOCKER_COMPOSE) exec app npm test

test-e2e:
	$(DOCKER_COMPOSE) exec app npm run test:e2e

test-cov:
	$(DOCKER_COMPOSE) exec app npm run test:cov

style:
	$(DOCKER_COMPOSE) exec app npm run lint

help:
	@echo "Comandos disponibles:"
	@echo "  make build     - Construir imagen"
	@echo "  make start     - Levantar contenedores"
	@echo "  make stop      - Detener contenedores"
	@echo "  make restart   - Reiniciar contenedores"
	@echo "  make bash      - Acceder a la terminal del contenedor"
	@echo "  make logs      - Ver logs"
	@echo "  make install   - Instalar dependencias"
	@echo "  make test      - Ejecutar pruebas"
	@echo "  make test-e2e  - Ejecutar pruebas E2E"
	@echo "  make style     - Ejecutar el linter"