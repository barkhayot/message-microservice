# Message Sharing (Microservice)
Microservices built with Python(Django) and NodeJS(Express) using Kafka

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Application has been  devided into 2 microservices using Kafka for Event sharing.
Services has been implemented only for research and learning purposes. First microservice has route that accepts POST request and by accepting it will share gotten data to kafka event layer. Second microservice will recieve sent data by its topic and it will save recieved data to database.


To run application clone the source and install all required dependencies

## Installation

### Application requires [Python](https://www.python.org/) v3.8+ to run.

Install the dependencies and devDependencies and start the server.

```sh

pip install requirements.txt

```

In order to run nodejs script open new terminal and run following script after installing needed packages

```sh

node app.js

```


The following script has been added inside app folder 

```sh

project/app/management/commands --> run_script.py

```

### explanation
<p float="left">
  <img src="https://github.com/barkhayot/message-microservice/blob/main/explanation.jpg" alt="Markdown Monster icon" style="width:100%"/>
  </p>


### scree of usage

<p float="left">
  <img src="https://github.com/barkhayot/message-microservice/blob/main/test.png" alt="Markdown Monster icon" style="width:100%"/>
  </p>