FROM python:3.11-slim

WORKDIR ./

ENV FLASK_APP=main.py 
ENV FLASK_ENV=development

COPY ./requirements.txt .
COPY . .

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install -r requirements.txt

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
