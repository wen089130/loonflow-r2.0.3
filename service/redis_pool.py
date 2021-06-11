import redis
from django.conf import settings


redis_host = settings.REDIS_HOST
redis_db = settings.REDIS_DB
redis_port = settings.REDIS_PORT
redis_password = settings.REDIS_PASSWORD

POOL = redis.ConnectionPool(host=redis_host, port=redis_port, password=redis_password, max_connections=1000)

