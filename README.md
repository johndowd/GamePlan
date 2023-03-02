# GamePlan

This app allows users to plan nights to play their favorite boardgames. Users can add, delete, edit their plans, join other user's plans. Games are added through the BoardGameAtlas API. Maps are rendered using the Google Maps API & the Google Geocoder API. 

![image of app running](https://github.com/johndowd/GamePlan/blob/main/images/gameplan-screenshot.png)

# Usage

Some, but not all features are hidden to users unless they are logged in. Feel free to make a new account, or use these login details for quicker access:

email: knickfan99@notreal.com
pass: 123456

[Link to site](https://gameplan.herokuapp.com)

# Features

* Users can create accounts and upload profile images using AWS
* Users can view a list of all current plans, by plan, by game or by user. 
* Users can search for games, other users, and plan names. They can additionally sort by game name and happening soon
* Users can create new game plans, searching for the location optionally using the Google Places API, and search the BoardGameAtlas API for whatever game they want to play. 
* Users can join game plans as long as they are not full
* Users can view the location of where the plan is happening via the google Maps & Geocoder APIs. 
* Users can leave comments on plans to share ideas and thoughts with other users. 
* Users can edit/delete plans if they are the one who created them.
* Users can view most popular days for board game plans on the landing page using Nivo Calendar 
* Users can view their friends on their profile page, and go to other user's profile pages to add them as friends

### TO DO:

- [x] Add and view Friends [#29](https://github.com/johndowd/GamePlan/tree/adding-friends-feature) 
- [x] Pagination [#51](https://github.com/johndowd/GamePlan/tree/adding-pagination)
- [ ] Footer on page
- [ ] Data visualation at /games to see most popular games on the site
- [ ] controller tests for api endpoints
- [ ] model level tests for methods

# Technologies Used

Front End: ReactJs, HTML/Sass

Back End: NodeJs, Express, Postgres, Objection & Knex

# Contributors

Creator: Jack Dowd
 
# Local Set up

* Clone repository
* Set up .env using .env.example. This requires a Maps API key
* Then, in the home directiory, run:

```
yarn install #installs dependencies
createdb GamePlan_development
cd server
yarn migrate:latest #runs db migrations
yarn db:seed #optionally seeds data
cd ..
yarn dev #runs server
```

Then go to `localhost:3000` in your browser to see the app!

# How To Contribute

Bug reports and pull requests are welcome on Github at [https://github.com/johndowd/GamePlan/](https://github.com/johndowd/GamePlan/). Use the [fork-and-branch](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/) workflow to contribute.

This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct. 
