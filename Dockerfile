

FROM node:lts-alpine as BUILD_IMAGE
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY ./ ./
RUN yarn install
RUN yarn build


FROM node:lts-alpine 
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/app/package.json ./
COPY --from=BUILD_IMAGE /usr/app/src ./src
COPY --from=BUILD_IMAGE /usr/app/public ./public
COPY --from=BUILD_IMAGE /usr/app/assets ./assets
COPY --from=BUILD_IMAGE /usr/app/.next ./.next

EXPOSE 3000
CMD ["yarn", "start"]










