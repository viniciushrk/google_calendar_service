const express = require('express');
const {insertEvent} = require('./google_calendar');
// import cluster from 'cluster';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  let dateTime = dateTimeForCalander();

  // Event for Google Calendar
  let event = {
      'summary': `This is the summar mr day.`,
      'description': `This is the description.`,
      'start': {
          'dateTime': dateTime['start'],
          'timeZone': 'America/Porto_Velho'
      },
      'end': {
          'dateTime': dateTime['end'],
          'timeZone': 'America/Porto_Velho'
      }
  };

   let result = await insertEvent(event);

   res.json({status: result});
});

// if ( cluster.isMaster ) {
//   for (let i = 0; i < 2 ; i++){
//     cluster.fork()
//   }

// } else {
  app.listen(port, () => {
    console.log(`Running in ${process.pid} at http://localhost:${port}/`);
  });
// }