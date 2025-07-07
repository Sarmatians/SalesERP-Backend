FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --force

COPY . .

# Debug: Print tsconfig and list source files
RUN cat tsconfig.json && ls -al src

RUN npm run build

# Debug: Confirm dist/main.js exists
RUN echo "Dist Contents:" && ls -al dist

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
