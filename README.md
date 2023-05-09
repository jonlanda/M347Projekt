# M347Projekt

http://10.2.32.17:30080/

## TO DEPLOY CHANGES
- build the dockerfile '`docker build -t <image-nam>:<tag>`'
- push it to dockerhub'`docker push <image-name>:<tag>`'
- change the tag of the image used in the kubernetes deployment '`kubectl set image deployment/<deplyoment>` `<container-name>=<image-name>:<tag>`'
