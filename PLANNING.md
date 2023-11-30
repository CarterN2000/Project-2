

# Planning Materials

## User Stories

Trello: https://trello.com/b/Tnga23kV/project-2 

## Wireframes

![](/images/Customize%20Your%20Profile%20Wireframe.png)

![](/images/Find%20a%20Match%20Wireframe.png)

![](/images/User%20Details%20Wireframe.png)

## ERD

![](/images/Screen%20Shot%202023-11-21%20at%203.01.24%20PM.png)


## Planning

1.  Profile schema 
        - All profiles are created based on the default schema (new.ejs)
        - Creation of unique profile ID
        - Necesarry to track profile ID
        
        - Profile Upload: 
            - Users upload images on Imgur --> copy past url string as source for image inprofile

        - User Authentication through Google/OAuth

2. Likes Schema 
    - contains values: 
        - user ID of profiles liked 
        - one for the user liking a profile
        - another for another user liking the profile
        - two matching documents to show there is a correlation
        - Boolean: 
            - default to false 
            - becomes true if both users have liked each other

3. Chat Schema 
    - One of the data types is an array of strings (messages)
        - upon sending a message that message is pushed into the chat array 
          then rendered on screen in order of submission
        - Chats are only available to two matching users
            - creates instance using the user ID's of both matching users
            
        - Boolean: read receipt (stretch goal) 
            - if messages in string and page has been loaded --> true
            - if no messages in string when page is loaded --> false

4. Landing Page: 
- Generic landing screen very sparse --> only app title with areas to sign up / login (login.ejs)
- Views of all users to look at (index.ejs)
- Users have the ability to view other profiles by clicking button associated with profile name (show.ejs)
- Nav bar --> side bar on left: 

    - Your Profile: 
        - page to view/edit personal details
        - current stats are filled in from profile creation
            - edit button -> take you to edit page (new.ejs)
            - option to delete profile

    - Matches: (matches.ejs)
        - takes you to a separate screen --> similar to index.ejs
        - only populated with matches
        - delete a match 
            - includes chat schema 

5. Design Goals: 
    FOR ASHLEY: Colorful chat similar to VS code
        - programming languages have different colors --> JS is yellow, PHP blue etc... 
        - different keywords get different colors (like in vs code)
    - about me section: visually structured as a JS function
    - Like buttons --> like === true or like === false
    - Let aboutMe = "Something Something"
    - Chat: visually is dark mode --> like VS code UI
    - Simplisitc Modern color palette 
        - very few / no bright colors --> easy on the eyes
        - Sans-serif: Goal 1 or 2 font families, no more than 3
            1 font: for UI 
            1 font: for chats 
            1 for Title of app/website
    - Tag line


- Stretch Goal: 
    -  Update application to be responsive on mobile
    - Google maps api -> location based user (mapbox)
