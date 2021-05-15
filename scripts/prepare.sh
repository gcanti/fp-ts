TMP_DIR=`mktemp -d`

npm run build

mv dist -t $TMP_DIR

rm -rf *

mv $TMP_DIR/dist/* -t .
