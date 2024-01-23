FROM python:3.11.1

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python3", "-m", "src.main"]

# CMD ["python3", "-m", "src.main", "0.0.0.0", "--port", "3000"]

EXPOSE 8080
