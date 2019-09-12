tar cvf ds_prototype.tar ../server ../package.json ../client/dist
scp -i ~/AWS_Keys/acedInterventionInstance.pem ds_prototype.tar ec2-user@app.acedintervention.com:/tmp
rm ds_prototype.tar