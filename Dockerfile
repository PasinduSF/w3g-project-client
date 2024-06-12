FROM node:latest 


WORKDIR /app
COPY package*.json ./
RUN  npm install 
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm","run", "dev"]  # Start the Next.js server in production mode 