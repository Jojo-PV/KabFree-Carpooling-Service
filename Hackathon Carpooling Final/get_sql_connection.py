from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema

connection_url = "mysql://root:stairway7@localhost/"

def get_connection():
    engine = create_engine(connection_url)
    return engine

#conn = engine.connect()
#conn.execute(CreateSchema("KabFree"))

#conn.close()