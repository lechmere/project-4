import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/<YOUR-DATABASE-NAME>')
secret = os.getenv('SECRET', 'a suitable secret')