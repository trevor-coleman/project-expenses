import cookieParser from 'cookie-parser';
import express from 'express';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import path from 'path';

const app: express.Application = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build/client')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/client/index.html'));
});

// catch 404 and forward to error handler
app.use((req:express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err:HttpError, req:express.Request, res:express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    const {status} = err;
    res.status(status || 500).sendStatus(status);

});

module.exports = app;
