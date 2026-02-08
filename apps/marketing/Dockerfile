#########################################################
# @see https://dev.to/sebastiandg7/nx-nextjs-docker-the-nx-way-creating-the-nextjs-application-1efl
# @see https://dev.to/sebastiandg7/nx-nextjs-docker-the-nx-way-containerizing-our-application-1mi7
# @see https://nx.dev/nx-api/next/documents/overview
# @see https://medium.com/@wwdhfernando/efficient-deployment-of-next-js-24fd2825d6b4
# @see https://datawookie.dev/blog/2024/02/standalone-next-js-application-in-docker/
# @see https://www.youtube.com/watch?v=LVziN3yBtKU
#########################################################
FROM node:22-alpine

WORKDIR /app

RUN addgroup --system apps && \
  adduser --system -G apps apps

COPY apps/marketing/.next/standalone/ .
COPY apps/marketing/.next/static apps/marketing/.next/static
COPY apps/marketing/public apps/marketing/public

RUN chown -R apps:apps .

CMD ["node", "apps/marketing/server.js"]
