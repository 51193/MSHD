FROM ubuntu:20.04

ARG ANGULAR_VERSION=15

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai


RUN  sed -i s@/archive.ubuntu.com/@/mirrors.bupt.edu.cn/@g /etc/apt/sources.list \
     && apt update \
     && apt install -y nodejs npm curl wget git vim zsh \
     && apt autoclean \
     && apt autoremove

RUN npm config set registry https://registry.npm.taobao.org/  \
    && npm install -g n \
    && export N_NODE_MIRROR=https://npm.taobao.org/mirrors/node \
    && n latest

RUN corepack enable \
    && yarn config set registry https://registry.npm.taobao.org \
    && yarn global add @angular/cli@${ANGULAR_VERSION}

# oh-my-zsh
RUN wget https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh \
    && sed -i s@REPO=\${REPO:-ohmyzsh/ohmyzsh}@REPO=\${REPO:-mirrors/oh-my-zsh}@ \install.sh \
    && sed -i s@REMOTE=\${REMOTE:-https://github.com/\${REPO}.git}@REMOTE=\${REMOTE:-https://gitee.com/\${REPO}.git}@ \install.sh \
    && chmod +x install.sh \
    && ./install.sh -y

RUN ng config --global cli.packageManager yarn
