.PHONY: build start stop restart bash logs clean install test test-e2e test-cov

# Variables
DOCKER_COMPOSE = docker compose

build:
	$(DOCKER_COMPOSE) build

start:
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
	$(DOCKER_COMPOSE) exec app npm install

test:
	$(DOCKER_COMPOSE) exec app npm test
	make test-e2e

test-e2e:
	$(DOCKER_COMPOSE) exec app npm run test:e2e

test-cov:
	$(DOCKER_COMPOSE) exec app npm run test:cov

help:
	@echo "Comandos disponibles:"
	@echo "  make build     - Construir imagen"
	@echo "  make start     - Levantar contenedores"
	@echo "  make stop      - Detener contenedores"
	@echo "  make restart   - Reiniciar contenedores"
	@echo "  make shell     - Acceder al shell"
	@echo "  make logs      - Ver logs"
	@echo "  make clean     - Limpiar recursos"
	@echo "  make install   - Instalar dependencias"
	@echo "  make test      - Ejecutar pruebas"
	@echo "  make test-e2e  - Ejecutar pruebas E2E"
