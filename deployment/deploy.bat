cd ..
echo "Starting build"
bash -c "npm run build"
echo "Copying /dist"
scp -r .\dist\ cristopi@192.168.0.16:/home/cristopi
ssh cristopi@192.168.0.16 "cp -a /home/cristopi/dist/. /var/www/html/openmediadb/"