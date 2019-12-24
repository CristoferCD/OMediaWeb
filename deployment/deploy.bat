cd ..
echo "Starting build"
bash -c "npm run build"
echo "Copying /dist"
scp -r .\dist\ cristopi@192.168.50.133:/home/cristopi
ssh cristopi@192.168.50.133 "cp -a /home/cristopi/dist/. /var/www/html/openmediadb/"