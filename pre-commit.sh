#!/usr/bin/env bash
trap exit SIGINT

./vendor/bin/duster fix
prettier --write frontend/**/*.js
prettier --write frontend/**/*.vue
