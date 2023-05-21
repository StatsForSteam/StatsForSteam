FROM python:3

# Assuming the console is open inside /backend/
WORKDIR ./

ENV FLASK_APP=main.py 

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "python3", "main.py" ]
