# Pollz Voting App

## Routes

_UNDER DEVELOPMENT_

**GET /**
+ Shows unauthenticated users all polls.
+ Shows authenticated users a choice of all polls, filterable to personal polls?
+ Links to 
  + /login
  + /results
  + /logout _(Auth only)_
  + /poll _(Auth only)_
  + /vote _(Auth only)_
  + /mypolls _(Auth only)_

**GET /login**
+ Shows login form
  + Form posts to _/sendtoken_
+ Explains passwordless auth, directs users to use real email
+ Links to
  + /
  + /login (?)

**POST /sendtoken**
+ Handles sign-up form (passwordless does the heavy lifting here)
+ Redirects to /sent

**GET /sent**
+ Explains requirement to access email for one-time token
+ Links to
  + /

**GET /vote/:POLLID** _(Auth only)_
+ Shows poll and options
+ Should not allow repeat votes
+ Posts to /vote
+ Unauthenticated users redirect to /sign-in
+ Links to
  + /
  + /results (to see results without voting)

**POST /vote** _(Auth only)_
+ Handles user's vote
+ Redirects to /results

**GET /poll** _(Auth only)_
+ Form to create new poll
+ Posts to /poll
+ Unauthenticated users redirect to /sign-in
+ Links to
  + /

**POST /poll** _(Auth only)_
+ Handles new poll creation
+ Redirects to /vote

**GET /results/:POLLID**
+ Shows results bar chart for chosen poll
+ Links to
  + /
  + /sign-in
  + /sign-up
  + /vote

**GET /mypolls**
+ Lists users polls
+ Links to
  + /
  + /poll
  + /results/:POLLID
  + /logout