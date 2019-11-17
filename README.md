## CS297P Project: FLINE

This app is made for students to make friends with each other around their campus based on our recommendation system.

### Setup

Contact developer for full configurations and copy `.env.local` to `.env`, then fill in all the parameters as needed.

Run:

```shell
// install required pakages
$ npm install
// you may need to build next files before startign the server
$ npm run build
// start the server in development mode
$ npm run dev
```

and navigate your browser to `localhost:3000` 

### Folder Structure

```
.
├── client                  # front-end
│   ├── pages               # views
│   │   ├── index.js        # main page
│   │   ├── user            # pages for user functions
│   │   ├── friend          # pages for friend functions (*)
│   │   ├── course          # pages for course functions (*)
│   │   └── ...             # other pages (*)
│   └── components          # reusable modules for views
│       └── ...             # (*)
├── node_modules            # packages used in this project
├── public                  # 
├── server                  # backend:
│   ├── models              # database interface
│   │   ├── db.js           # database connection
│   │   ├── user.js         # operations for user database
│   │   └── ...             # operations for other database (*)
│   ├── routes              # server-side router
│   │   ├── index.js        # routing table
│   │   ├── users.js        # api for user logics
│   │   └── ...             # api for other logics (*)
│   └── index.js            # entry point for the server
├── .env                    # environment variables and constant
├── .env.local              # environment variables and constant
├── package.json            # package and npm script configurations
└── README.md               # 
```

The folders with `(*)` appended are where you add your new features.
