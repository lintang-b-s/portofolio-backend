import  createError  from 'http-errors' ;
import  express  from 'express' ;
import  path  from 'path' ;
import  cookieParser  from 'cookie-parser' ;
import  logger  from 'morgan' ;
import  cors  from "cors" ;
import cloudinary from "cloudinary"
import fs from "fs";
import morgan from "morgan";
import  dotenv  from "dotenv" ;
import  connectDB  from "./config/db.js" ;
import { notFound, errorHandler }  from "./middleware/error.middleware.js" ;
import projectRouter  from './routes/projectRouter.js' ;
import contactRouter  from './routes/contactRouter.js' ;
import aboutRouter  from './routes/aboutRouter.js' ;
import session from "express-session";
import FileStore from "session-file-store";
import passport from "passport";
import {getToken, jwtPassport, verifyUser, verifyAdmin} from "./authenticate.js";
import adminRouter from './routes/adminRouter.js'
import usersRouter from './routes/usersRouter.js'
import uploadRouter from './routes/uploadRouter.js';


dotenv.config();
connectDB();
var app = express();

// view engine setup

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));


// const corsOptions = {
//   origin: 'http://localhost:3001/',
// }

// const configuredCors = cors(corsOptions);

// app.options('*', configuredCors)

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  
});


// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(passport.initialize());

app.use('/api/upload', uploadRouter);
app.use('/api/projects', projectRouter)
app.use('/api/contacts', contactRouter);
app.use('/api/about', aboutRouter);
app.use('/api/admins', adminRouter);
app.use('/api/users', usersRouter);

const __dirname = path.resolve();



// yang bener yang atas
app.use(express.static(__dirname))
// app.use(express.static(path.join(__dirname + "/frontend")))
console.log("file: ",__dirname + "/frontend")

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'frontend/public/index.html'))  
)

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.get("/", (req, res) => {
  res.send("API is running");
});

// catch 404 and forward to error handler
app.use(notFound);
app.use(errorHandler);

const PORT = 3001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


export default app;
