# Pollz Voting App

## Routes

_UNDER DEVELOPMENT_

**GET /**
+ Shows unauthenticated users all polls.
+ Shows authenticated users a choice of all polls, filterable to personal polls
+ Links to 
  + /sign-up 
  + /sign-in
  + /results
  + /poll _(Auth only)_
  + /vote _(Auth only)_

**GET /sign-up**
+ Shows sign up form
  + Form posts to _/sign-up_
+ Explains passwordless auth, directs users to use real email
+ Links to
  + /
  + /sign-in

**POST /sign-up**
+ Handles sign-up form
+ Redirects to /sign-in 

**GET /sign-in**
+ Explains requirement to access email for one-time token
+ Shows sign in form, with a remember me checkbox
  + Form posts to /sign-in
+ Links to
  + /
  + /sign-up

**POST /sign-in**
+ Handles sign in form
+ Creates persistent token/cookie if remember me is _true_
+ Redirects to / (or whichever page passed user to sign-in/up)

**GET /vote** _(Auth only)_
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

**GET /results**
+ Shows results bar chart for chosen poll
+ Links to
  + /
  + /sign-in
  + /sign-up
  + /vote