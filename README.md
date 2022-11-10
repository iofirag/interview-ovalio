# Request Pacing Exercise

### Init Project
```
npm i
npm run dev
```
After running these commands the project should be up and running.

### Current state of the project

The following endpoint generates a random number for any valid user token provided.
http://localhost:3000/getRandomNumber/:token

For your convenience, a table with valid links will be printed to the console on startup.

e.g.
http://localhost:3000/getRandomNumber/zsEQjl-52aroL-xnUeK9-iJ8a4G

Resp:
```
{
    "number":125
}
```


### The Exercise:
You are required to implement the "validatePacing" function under app/lib/pacing.js module.

This function should return FALSE in case that a single user made more than 5 requests during a timeframe of 60 seconds, and TRUE otherwise.

e.g. if a single user made his requests as follows:

```
1) 13:00:30 
2) 13:00:47  
3) 13:00:52  
4) 13:01:10  
5) 13:01:22  
6) 13:01:35  
7) 13:01:40 - Invalid  
8) 13:01:50 - Valid
```
then 
- The 7th request should be considered as INVALID, because there were 6 requests during 13:00:40 - 13:01:40.
- The 8th request should be considered as VALID, because there were only 5 (the 13:01:40 request should not be counted, as it was blocked) 

### In your implementation:
- Expect a very large number of different tokens 
- A margin of error is acceptable in exchange for a better performance
- Redis is allowed and recommended
- Keep your code organized and readable


Good Luck!


# Request Pacing Solution:  
    
    $ docker compose up
    $ yarn
    $ yarn start