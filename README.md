# Fibonacci Sequence Generator

There are 2 (technically 3) different methods to build and run the application.

## Instructions

Prereqs:
- Docker OR Nodejs 

### Docker

#### Docker Method 1 - No code checkout
1. This will pull the code straight from github into the docker daemon where it will be built first and then run. We are using `fib:5` tag and container name `fib-seq-gen`. Don't worry the `--rm` in the command here simply instructs docker to remove 'intermediary' fs layers during the build as to not take up any space. 
```bash
docker build --rm -t fib:5 github.com/kw4bq/fibonacci-seq-generator && \
docker run -d --name fib-seq-gen -p 9090:9090 fib:5
```

2. Visit `localhost:9090` in your browser. You can run `sudo docker stop fib-seq-gen` to kill the container.

#### Docker Method 2 - Code checkout
1. Clone repository to local `git clone github.com/kw4bq/fibonacci-seq-generator` and `cd fibonacci-seq-generator`
2. Build the docker image defined in the `Dockerfile` using the following command `sudo docker build --rm -t fib:1 github.com/kw4bq/fibonacci-seq-generator`
3. Once the build is complete, we want to run the container, `sudo docker run -d --name fib-seq-gen -p 9090:9090 fib:1`
4. Visit `localhost:9090` in your browser. You can run `sudo docker stop fib-seq-gen` to kill the container.

#### Local Only - No docker needed
1. Clone repository to local `git clone github.com/kw4bq/fibonacci-seq-generator` and  `cd fibonacci-seq-generator`
2. Run `npm install` followed by `npm run build` to build the react dist/production files in the `build` folder
3. Run `node server.js` to start the Nodejs Express server.
4. Visit `localhost:9090` in your browser.
5. `Control C` in the terminal to kill `node`.

## Notes

### Tests
To run the tests, run `npm install` and then `npm test`. These are the tests included with `create-react-app` so they serve a just an example.

### Jenkins
A `Jenkinsfile` is also included. You can run Jenkins in a docker container on your local machine, create a new `Pipeline from SCM`, choose Git, and enter this github repo. It will pull the Jenkinsfile from github and build, test, and archive the build (in a docker container). Checkout the jenkins-build-successful.log and .png file included in the repo. Sweet!
