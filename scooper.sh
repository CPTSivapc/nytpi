    #!/bin/sh

PROJECT_NAME="[PROJECT_NAME]"

echo "Building local version into index.html"

cat nyt5Head.html > index.html
cat body.html | sed "s/---pppath---//" >> index.html
cat nyt5Foot.html >> index.html


echo "Building scoop version into scoop.html"


cat body.html | sed "s/---pppath---/http\:\/\/graphics8\.nytimes\.com\/ads\/paidpost\/$PROJECT_NAME\//" > scoop.html



echo "Building staging version into $1"

cat nyt5Head.html > $1
cat body.html | sed "s/---pppath---//" >> $1
cat nyt5Foot.html >> $1


