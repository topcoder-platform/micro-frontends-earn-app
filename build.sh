#!/bin/bash
set -eo pipefail
APP_NAME=$1
UPDATE_CACHE=""

docker build -f docker/Dockerfile -t $APP_NAME:latest \
--build-arg APPMODE=$APPMODE \
--build-arg APPENV=$APPENV \
--build-arg RECRUIT_API=$RECRUIT_API \
--build-arg AUTH_SECRET=$AUTH_SECRET \
--build-arg VALID_ISSUERS=$VALID_ISSUERS \
--build-arg AUTH0_URL=$AUTH0_URL \
--build-arg AUTH0_AUDIENCE=$AUTH0_AUDIENCE \
--build-arg AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID \
--build-arg AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET \
--build-arg AUTH0_PROXY_SERVER_URL=$AUTH0_PROXY_SERVER_URL \
--build-arg M2M_AUDIT_USER_ID=$M2M_AUDIT_USER_ID \
--build-arg M2M_AUDIT_HANDLE=$M2M_AUDIT_HANDLE .

docker create --name app $APP_NAME:latest

if [ -d node_modules ]
then
  mv package-lock.json old-package-lock.json
  docker cp app:/$APP_NAME/package-lock.json package-lock.json
  set +eo pipefail
  UPDATE_CACHE=$(cmp package-lock.json old-package-lock.json)
  set -eo pipefail
else
  UPDATE_CACHE=1
fi

if [ "$UPDATE_CACHE" == 1 ]
then
  docker cp app:/$APP_NAME/node_modules .
fi