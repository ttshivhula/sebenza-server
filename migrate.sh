#!/bin/sh
npx sequelize-cli --options-path=database/sequelize_options.js db:migrate
npx sequelize-cli --options-path=database/sequelize_options.js db:seed:all
