#!/bin/bash

read -p 'What is the interactive slug? ' slug

mkdir $slug
cd $slug
mkdir js
mkdir css
mkdir img
echo $slug > README.md
echo '' > js/$slug.js
echo '' > css/$slug.css
