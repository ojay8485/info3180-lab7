from flask_wtf.form import FlaskForm
from flask_uploads import UploadSet, IMAGES
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

images = UploadSet('images', IMAGES)

class UploadForm(FlaskForm):
    description = TextAreaField("description", validators=[DataRequired()])
    photo = FileField("photo", validators=[FileRequired(), FileAllowed(images, 'Images only!')])