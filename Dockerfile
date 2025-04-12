FROM node:22-alpine AS development

WORKDIR /usr/src/app

# Primera ejecución: solo copiamos package.json para instalar dependencias
COPY package.json ./
RUN npm install

# Copiamos el resto de archivos
COPY . .

# Exponemos el puerto
EXPOSE 3000

CMD ["npm", "run", "start:dev"]