# -------------------------------------------------------
# 📦 Makefile pro správu 🐳 Docker Compose stacku
# Projekt: MongoDB with Docker (Nodejs + HTML + MongoDB)
# -------------------------------------------------------

PROJECT_NAME = mongo-docker-app
DOCKER_COMPOSE = docker compose

# -------------------------------------------------------
# 🟢 Spuštění všech služeb (build + run) a na pozadi -d
# -------------------------------------------------------
up:
	@echo "🚀 Spouštím projekt $(PROJECT_NAME)..."
	$(DOCKER_COMPOSE) up -d --build
	@echo "✅ Hotovo! Otevři http://localhost nebo EC2 IP."

# -------------------------------------------------------
# 🔴 Zastavení a odstranění kontejnerů
# -------------------------------------------------------
down:
	@echo "🧹 Ukončuji a mažu kontejnery..."
	$(DOCKER_COMPOSE) down

# -------------------------------------------------------
# ♻️ Restart všech služeb
# -------------------------------------------------------
restart:
	@echo "🔁 Restart všech služeb..."
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

# -------------------------------------------------------
# 🧱 Build (bez spouštění)
# -------------------------------------------------------
build:
	@echo "🏗️  Build všech image..."
	$(DOCKER_COMPOSE) build

# -------------------------------------------------------
# 📜 Logy všech služeb (živě)
# -------------------------------------------------------
logs:
	@echo "📜 Zobrazuji logy (Ctrl+C pro ukončení)..."
	$(DOCKER_COMPOSE) logs -f

# -------------------------------------------------------
# 🧩 Logy konkrétní služby, např. `make logs service=mongo`
# -------------------------------------------------------
logs-service:
	@echo "📜 Logy pro službu: $(service)"
	$(DOCKER_COMPOSE) logs -f $(service)

# -------------------------------------------------------
# 🧰 Otevření shellu v konkrétním kontejneru
# Použití: make sh service=mongo-db-mongodb-1
# -------------------------------------------------------
sh:
	@echo "🔍 Otevírám shell v kontejneru: $(service)"
	$(DOCKER_COMPOSE) exec -it $(service) bash

# -------------------------------------------------------
# 🧼 Úplné vyčištění (kontejnery, volume, image)
# -------------------------------------------------------
clean:
	@echo "🧨 Mažu vše včetně volume a image..."
	$(DOCKER_COMPOSE) down -v --rmi all
	@echo "✅ Prostředí vyčištěno."

