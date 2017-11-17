#!/bin/bash

cp ./node_modules/mb-icons/dora/icon-list.min.json ../../stories/json/dora.json
cp ./node_modules/mb-icons/mb/icon-list.min.json ../../stories/json/mb.json

cp ./node_modules/mb-icons/dora/fonts/* ./fonts
cp ./node_modules/mb-icons/mb/fonts/* ./fonts
rm ./fonts/*.styl
