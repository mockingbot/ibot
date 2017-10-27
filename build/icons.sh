#!/bin/bash

cp ./node_modules/mb-icons/mb/icon-list.min.json ./packages/icon/icon-list.json
cp ./node_modules/mb-icons/mb/fonts/* ./packages/icon/fonts
rm ./packages/icon/fonts/*.styl
