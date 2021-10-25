FROM node:lts-alpine3.14 AS compiler

ADD . /

WORKDIR / 
RUN npm --registry https://registry.npm.taobao.org install 
RUN npm run build

# RUNNING
FROM nginx:1.21-alpine
COPY --from=compiler /dist/ /usr/share/nginx/html/
COPY --from=compiler /nginx.conf /etc/nginx/nginx.conf


