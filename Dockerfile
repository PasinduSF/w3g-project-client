FROM node:latest 

# Declare build time environment variables (if needed)
ARG NEXT_PUBLIC_BASE_URL 

WORKDIR /app
COPY package*.json ./
RUN  npm install 
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm","run", "start"]  # Start the Next.js server in production mode 