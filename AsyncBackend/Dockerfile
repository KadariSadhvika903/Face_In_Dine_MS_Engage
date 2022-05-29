# pull official base image
FROM python:3.8-slim-buster

# set work directory
WORKDIR /app

RUN apt-get update
RUN apt-get install -y ffmpeg libsm6 libxext6

# install dependencies
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

# copy project
COPY . .

CMD python server.py --port $PORT