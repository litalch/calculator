FROM node

WORKDIR app
ENV NODE_ENV=development

COPY . .
RUN npm install --development

EXPOSE 3000

CMD ["npm", "start"]
