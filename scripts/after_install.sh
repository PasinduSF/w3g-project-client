#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
echo 'cd /home/ec2-user/w3g-project/w3g-project-client/' >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
cd /home/ec2-user/w3g-project/w3g-project-client >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
echo 'npm install' >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
npm i --legacy-peer-deps >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
echo 'pm2 stop w3g-server' >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
sudo pm2 stop w3g-server >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
echo 'npm build' >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
npm run build >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
echo 'pm2 start w3g-server' >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
sudo pm2 start w3g-server >> /home/ec2-user/w3g-project/w3g-project-client/deploy.log
