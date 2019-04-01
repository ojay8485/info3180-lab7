from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_uploads import IMAGES
from flask_uploads import UploadSet, configure_uploads

app = Flask(__name__)
csrf = CSRFProtect(app)
UPLOAD_FOLDER = './app/static/uploads'
app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\xda'
app.config['UPLOADED_IMAGES_DEST'] = UPLOAD_FOLDER
images = UploadSet('images', IMAGES)
configure_uploads(app, (images,))
from app import views
