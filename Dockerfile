FROM node:latest
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir /omediaweb
COPY --from=0 /app/dist /omediaweb
COPY /conf/nginx.conf /etc/nginx/nginx.conf