    #!/bin/sh


echo "Building local version into index.html"

cat nyt5Head.html > index.html
cat body.html | sed "s/---pppath---//" >> index.html
cat nyt5Foot.html >> index.html


echo "Building scoop version into scoop.html"

cat body.html | sed "s/---pppath---/http\:\/\/graphics8\.nytimes\.com\/ads\/paidpost\/google\//" > scoop.html



echo "Building staging version into $1"

cat nyt5Head.html > $1
cat body.html | sed "s/---pppath---/http:\/\/ad-assets.nytimes.com\/stg\/google\//" >> $1
cat nyt5Foot.html >> $1


