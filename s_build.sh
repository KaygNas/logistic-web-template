#!/bin/bash

ls /usr/local/versions/node -a

export PATH=/usr/local/versions/node/v20.8.1/bin:$PATH

npm install -g pnpm

pnpm install

echo POSTGRES_URL=$POSTGRES_URL

pnpm build

cp -r ./public ./.next/standalone/public

cp -r ./.next/static ./.next/standalone/.next/static