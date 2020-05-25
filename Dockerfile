FROM node:alpine3.10 as node

WORKDIR /myapp/esea-admin-front

COPY . .

RUN cd /myapp/river-chief-web && npm install --registry=https://registry.npm.taobao.org && npm run build

FROM nginx:1.17.5-alpine

COPY --from=node /myapp/river-chief-web/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /myapp/river-chief-web/default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /myapp/river-chief-web/dist /usr/share/nginx/html
