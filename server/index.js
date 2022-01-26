const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

require('./config/connection');

const organisationsRoute = require('./routes/organisations');
const speakersRoute = require('./routes/speakers');
const eventsRoute = require('./routes/events');
const participantsRoute = require('./routes/participants');
const feedbackRoute = require('./routes/feedback');
const statsRoute = require('./routes/stats');

app.use('/organisations', organisationsRoute);
app.use('/speakers', speakersRoute);
app.use('/participants', participantsRoute);
app.use('/events', eventsRoute);
app.use('/feedback', feedbackRoute);
app.use('/stats', statsRoute);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})