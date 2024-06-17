#!/bin/bash

while inotifywait -e modify,create,delete -r /usr/share/nginx/html; do
    nginx -s reload
done
