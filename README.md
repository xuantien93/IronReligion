![IronReligion](https://i.imgur.com/hL3YORh.png)

Iron Religion is an original website for a future gym design that I want to build one day. Website offers users to show off their workout routines, connecting with coaches and signing up for classes.

IronReligion is still in development! More features being tested to make the website more alive.

Technologies used for this project are: Python, Flask, SQLAlchemy, JavaScript, React, HTML5, CSS3, Redux, PostgreSQL, GitHub, AWS, WebsocketIO.

Live Site: [IronReligion](https://ironreligion.onrender.com/)

## Wiki Links
[Database Schema](https://github.com/xuantien93/IronReligion/wiki/Database-Schema)

[MVP list](https://github.com/xuantien93/IronReligion/wiki/MVP-list)

[API Routes/User Stories](https://github.com/xuantien93/IronReligion/wiki/User-Stories)

## Features
- User registration and authentication: Users can create accounts and log in securely.
  
- Workout Routines: Users can view a routine feed of all the routines existing in the database posted from all users.

- Classes: Users can create, read, update, and delete their own class posts.

- Reviews: Users can create, read, update, and delete their own apparel review/rating.

### Bonus Feature
- WebSocketIO: Clients can chat with Admin to ask about products info.

## Installation
1. Clone the repository:

      git clone [here](https://github.com/xuantien93/IronReligion.git)

2. Install the dependencies:

      npm install --prefix react-app &&
      npm run build --prefix react-app &&
      pip install -r requirements.txt &&
      pip install psycopg2 &&
      pip install faker &&
      flask db upgrade &&
      flask seed all

4. Start project locally:

      in root directory run pipenv run flask run
      in seperate shell cd into react-app/
      run npm start


## Acknowledgments
IronReligion is built using various open-source libraries and frameworks including Python, Flask, SQLAlchemy, JavaScript, React and Redux.
