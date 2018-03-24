from flask import Flask,url_for,render_template
from flask import make_response

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def qaq():
    return render_template('firstpage_2.html')

@app.route('/map')
def map():
    response = make_response(render_template('map.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'  # 取消缓存
    response.headers['Pragma'] = 'no-cache'  # 禁止缓存
    return response

@app.route('/model')
def model():
    return render_template('index.html')

@app.route('/person')
def person():
    return render_template('person.html')

@app.route('/snumber_down')
def snumber_down():
    return render_template('snumber_down.html')

@app.route('/snumber_right')
def snumber_right():
    return render_template('snumber_right.html')

@app.route('/<name>/edu')
def edu(name):
    return render_template('new_edu.html',name=name)

@app.route('/<name>/age')
def age(name):
    return render_template('ageStructure.html',name=name)

@app.route('/<name>/nation')
def nation(name):
    return render_template('nationality.html',name=name)

@app.route('/<name>/job')
def job(name):
    response = make_response(render_template('job.html',name=name))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'  # 取消缓存
    response.headers['Pragma'] = 'no-cache'  # 禁止缓存
    return response

@app.route('/<name>/percentage')
def per(name):
    return render_template('percentage.html',name=name)





if __name__ == '__main__':

    app.run()
