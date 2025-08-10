### Configuração recomendada do projeto

# NodeJS
sudo dnf install nodejs

# Angular
sudo npm install -g @angular/cli@20

# VSCode
wget https://update.code.visualstudio.com/latest/linux-rpm-x64/stable -O code-latest-x64.rpm
sudo dnf install ./code-latest-x64.rpm
rm ./code-latest-x64.rpm
code --install-extension Angular.ng-template