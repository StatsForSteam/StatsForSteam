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

CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:5000", "-t 30"]