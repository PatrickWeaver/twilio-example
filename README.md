# Twilio Example

This app sends and receives SMS messages using Twilio. It stores sent/received messages in memory, if the app restarts messages are lost. To get started you will need to make a <a href="https://twilio.com" target="_blank">Twilio</a> account and buy a Twilio phone number. If you have a trial account with Twilio (you will until you add money to your account -- even once you've bought a phone number), you will only be able to send SMS to verified numbers. More info about Twilio trial accounts <a href="https://support.twilio.com/hc/en-us/articles/223136107-How-does-Twilio-s-Free-Trial-work-" target="_blank">here</a>. You can add verified numbers to your account <a href="https://www.twilio.com/console/phone-numbers/verified" target="_blank">here</a>.
    
### You will need to set values for the following environment variables:

- ACCOUNT_SID -- Get this from Twilio it is a long alphanumeric string
- AUTHTOKEN  -- Also get this from Twilio, also a long alphanumeric string
- FROM_TWILIO_NUMBER -- This is a phone number you bought on Twilio