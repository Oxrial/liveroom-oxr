FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-buster

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
# 设置root用户的密码
RUN echo "root:root" | chpasswd
# RUN apt-get update && apt-get install -y openssh-server
# RUN mkdir /var/run/sshd

# # 允许root用户通过SSH登录
# RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# # 开放SSH端口
# EXPOSE 22

# # 启动SSH服务
# CMD ["/usr/sbin/sshd", "-D"]