FROM node:19-alpine

WORKDIR /app

COPY . ./

RUN npm i
RUN npm install -g serve


RUN npm run build
ENV NODE_ENV production


EXPOSE 3000

CMD ["HOST=0.0.0.0","serve", "-s", "build"]