    #!/bin/sh

CLIENT_NAME="[CLIENT]"
PROJECT_NAME="[PROJECT]"


ASSET_URL_PATH_RP="---pppath---"
ASSET_URL="http\:\/\/graphics8\.nytimes\.com\/ads\/paidpost\/$CLIENT_NAME\/$PROJECT_NAME\/"

VIDEO_ASSET_URL_RP="---ppvideopath---"
VIDEO_ASSET_URL="http\:\/\/video1\.nytimes\.com\/video\/ads\/paidpost\/$CLIENT_NAME\/$PROJECT_NAME\/"

#HOLDING OFF ON THIS UNTIL CAN GET SOMETHING STABLE, MAYBE DO THIS VIA NODE INSTEAD?
#echo "lets test for curl"

#TEMP_FILE=$(curl --cookie nada --location http://paidpost.nytimes.com/ernst-and-young/its-the-year-of-the-big-deal.html )


echo "Building local version into index.html"

cat htmlComponents/nyt5Head.html > tempIndex.html
cat htmlComponents/body.html | sed "s/$ASSET_URL_PATH_RP//g" | sed "s/$VIDEO_ASSET_URL_RP/vids\//g" >> tempIndex.html
cat htmlComponents/nyt5Foot.html >> tempIndex.html

cat tempIndex.html | sed "s/\[CLIENT\]/$CLIENT_NAME/g" > index.html
rm tempIndex.html

echo "Building scoop version into scoop.html"

echo "$ASSET_URL_PATH_RP/$ASSET_URL/g"
cat htmlComponents/body.html | sed "s/$ASSET_URL_PATH_RP/$ASSET_URL/g" | sed "s/$VIDEO_ASSET_URL_RP/$VIDEO_ASSET_URL/g" > scoop.html



#removing ad-assets creation for the time being since it just seems to be a duplicate of index.html
#echo "Building staging version into $1"

#cat htmlComponents/nyt5Head.html > $1
#cat htmlComponents/body.html | sed "s/$ASSET_URL_PATH_RP//g" | sed "s/$VIDEO_ASSET_URL_RP/vids\//g" >> $1
#cat htmlComponents/nyt5Foot.html >> $1





