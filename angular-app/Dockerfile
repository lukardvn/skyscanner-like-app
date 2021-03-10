FROM node:15.2.0-alpine3.10 As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.19.4-alpine

COPY --from=builder /usr/src/app/dist/angular-app/ /usr/share/nginx/html