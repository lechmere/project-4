from app import db

user_bookshelf_join = db.Table('user_bookshelf',
  db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
  db.Column('bookshelf_id', db.Integer, db.ForeignKey('bookshelf.id'), primary_key=True)
)