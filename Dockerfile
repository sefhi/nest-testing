FROM node:22-alpine AS development

WORKDIR /usr/src/app

# Instalamos NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Primera ejecución: solo copiamos package.json para instalar dependencias
COPY package.json ./
RUN npm install

# Copiamos el resto de archivos
COPY . .

# Exponemos el puerto
EXPOSE 3000

# En desarrollo, usamos este comando para habilitar inicialización
CMD ["sh", "-c", "if [ ! -f src/main.ts ]; then nest new . --skip-git --package-manager npm; fi && npm run start:dev"]