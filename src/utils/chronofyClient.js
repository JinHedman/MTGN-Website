import axios from 'axios';

async function fetchWeeklySchedule() {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
    try {
      const response = await axios.get('https://api.cronofy.com/v1/events', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CRONOFY_ACCESS_TOKEN}`,
        },
        params: {
          from: today.toISOString(),
          to: oneWeekFromNow.toISOString(),
        },
      });
  
      const events = response.data.events.map((event) => ({
        title: event.summary,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
  
      console.log('Upcoming events:', events);
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  export default fetchWeeklySchedule