#!/bin/sh
CLIENT_NAME_RP="---client---"
CLIENT_NAME=$1
CLIENT_PATHNAME=$2

PROJECT_NAME=$3

ASSET_URL_PATH_RP="---pppath---"
ASSET_URL="http\:\/\/graphics8\.nytimes\.com\/ads\/paidpost\/$CLIENT_PATHNAME\/$PROJECT_NAME\/"

VIDEO_ASSET_URL_RP="---ppvideopath---"
VIDEO_ASSET_URL="http\:\/\/video1\.nytimes\.com\/video\/ads\/paidpost\/$CLIENT_PATHNAME\/$PROJECT_NAME\/"

JS_VERSION_RP="---jsversion---"
JS_VERSION=$4

CSS_VERSION_RP="---cssversion---"
CSS_VERSION=$5

mkdir _temp

# Acquire a fresh NYT5 article for dissect for tasty header and footers
echo "Acquiring up to date templates"
curl --cookie nada --location http://paidpost.nytimes.com/client/title.html  > _temp/full.html

# check to make sure the file size is greater than 0
if [ -s _temp/full.html ]
    then
        cat _temp/full.html | sed -n '/\<\!DOCT/,/\<article/p' > htmlComponents/nyt5Head.html
        cat _temp/full.html | sed -n '/\<\/article/,/\<\/html\>/p' > htmlComponents/nyt5Foot.html
    else
        echo "Warning: No network connection available, template not updated"
fi

#
# Begin creating environment specific builds
#

# Update body with cross environment replaces
cat htmlComponents/body.html | sed "s/$JS_VERSION_RP/$JS_VERSION/g" | sed "s/$CSS_VERSION_RP/$CSS_VERSION/g" | sed "s/$CLIENT_NAME_RP/$CLIENT_NAME/g" > _temp/body.html

echo "Building local version into index.html"

cat htmlComponents/nyt5Head.html | sed "s/\[CLIENT\]/$CLIENT_NAME/g" > index.html
cat _temp/body.html  | sed "s/$ASSET_URL_PATH_RP//g" | sed "s/$VIDEO_ASSET_URL_RP/vids\//g"  >> index.html
cat htmlComponents/nyt5Foot.html >> index.html

echo "Building scoop version into scoop.html"
cat _temp/body.html | sed "s/$ASSET_URL_PATH_RP/$ASSET_URL/g" | sed "s/$VIDEO_ASSET_URL_RP/$VIDEO_ASSET_URL/g" > scoop.html

rm -rf _temp

