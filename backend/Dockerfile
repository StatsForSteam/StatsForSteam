FROM python:3.11-slim

WORKDIR ./

ENV FLASK_APP=app.py 
ENV FLASK_ENV=development

COPY ./requirements.txt .
COPY . .

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install -r requirements.txt

CMD ["gunicorn", "app:app"]