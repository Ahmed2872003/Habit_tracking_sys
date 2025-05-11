FROM node:latest

WORKDIR /Habit_tracking_sys_Backend

COPY package*.json ./


RUN npm install


COPY ./ ./


EXPOSE 3000

CMD ["node", "app.js"]