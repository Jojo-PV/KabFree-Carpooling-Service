from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column,Integer,String,Table,MetaData
from sqlalchemy.orm import declarative_base

from get_sql_connection import get_connection
engine=get_connection()

Base = declarative_base(metadata=MetaData(schema="Kabfree"))

class User(Base):
    __tablename__ = 'users_login'
    id = Column(Integer, primary_key=True)
    username = Column(String(50))  # String column with length 50
    password = Column(String(100))  # String column with length 100

def get_and_verify_pwds(engine,username,password):

    status=False

    connection=engine.connect()

    Session = sessionmaker(bind=engine)
    session = Session() 

    query = session.query(User)
    all_rows = query.all()
    for row in all_rows:
        if username==row.username:
            if password==row.password:
                status=True
                session.close()
                connection.close()
                return status
            else:
                status=False
        else:
            status=False
    session.close()
    connection.close()
    return status
    


    