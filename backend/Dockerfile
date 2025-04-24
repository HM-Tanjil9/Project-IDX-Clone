FROM ubuntu:25.04
# Setup user
RUN useradd -ms /bin/bash sandbox

# Setup working directory
WORKDIR /home/sandbox

# Update & upgrade system
RUN apt update && apt upgrade -y

# Install nano & curl
RUN apt install nano curl -y

# Install node js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# Configure terminal to display current working directory 
RUN echo "PS1='\w'" >> /home/sandbox/.bashrc

# Setup final working directory
WORKDIR /home/sandbox/app

