FROM nginx:latest

# Install Node.js 18.x and Yarn
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y gnupg && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the entire application
COPY . .

# Build the Next.js application
RUN yarn build

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx and node application
CMD ["sh", "-c", "yarn dev & nginx -g 'daemon off;'"]
