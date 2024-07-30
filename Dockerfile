FROM node:20.11.0 as build

WORKDIR /app/frontend

COPY package*.json .

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/frontend/dist/sector7/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80