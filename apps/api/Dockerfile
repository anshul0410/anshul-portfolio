# Build and run the API from the repo root:
#   docker build -f apps/api/Dockerfile -t portfolio-api .
FROM node:22-alpine AS build
WORKDIR /repo
COPY package*.json ./
COPY apps/api/package.json apps/api/
RUN npm ci -w apps/api --include-workspace-root=false
COPY apps/api apps/api
RUN npm run build -w apps/api

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /repo/apps/api/package.json ./
RUN npm install --omit=dev
COPY --from=build /repo/apps/api/dist ./dist
USER node
EXPOSE 4000
CMD ["node", "dist/index.js"]
