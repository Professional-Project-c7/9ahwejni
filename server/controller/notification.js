// const express = require('express');
// const fetch = require('node-fetch');
const db = require('../Database/index'); // Assuming db exports the Sequelize connection and Token model

// db.connect(err => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.log('Connected to MySQL');
//   });
module.exports = {
   
    Posting : async function(req, res)   {
        const { token } = req.body;
        db.query('INSERT INTO tokens (token) VALUES (?)', [token], (err, results) => {
          if (err) {
            console.error('Error saving token:', err);
            res.status(500).send('Error saving token');
          } else {
            res.status(200).send('Token saved');
          }
        });
    },




 Posts : async function(req, res)   {
    const { title, message, data } = req.body;
    db.query('SELECT token FROM tokens', async (err, results) => {
      if (err) {
        console.error('Error fetching tokens:', err);
        res.status(500).send('Error fetching tokens');
      } else {
        const tokens = results.map(row => row.token);
  
        // Send the notifications
        try {
          for (const token of tokens) {
            // Example of a push notification payload
            const payload = {
              to: token,
              notification: {
                title,
                body: message,
              },
              data,
            };
  
            await sendPushNotification(payload);
          }
          res.status(200).send('Notifications sent');
        } catch (error) {
          console.error('Error sending notifications:', error);
          res.status(500).send('Error sending notifications');
        }
      }
    });
},




    // Send the notifications
     sendPushNotification : async (payload) => {
        // Replace this with your own push notification sending logic
        console.log('Sending push notification:', payload);
      }
      
     

//     responseData : await response.json(),
//     console.log(responseData);
//     res.status(200).send('Notifications sent');
//   } catch (error) {
//     console.error('Error sending notifications:', error);
//     res.status(500).json({ error: 'Failed to send notifications' });
//   }
}


