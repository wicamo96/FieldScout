# Field Scout
## Overview
Field Scout is an app designed to allow commercial greenhouse growers to track pest problems and make data driven chemical 
applications to target the problem at its source. It allows you to build out data points representing areas within your growing
space, add pests to track, enter scouting data for the current growing week, and visualize trends with graphs and heat
maps. 

This was an interesting way to dig into a problem faced in one of my previous roles and also gave me the opportunity to 
learn the fundamentals of D3.js independently.

## Video Demo

## Installation Instructions
1. Clone Repository
2. Open a git terminal and navigate to the /client directory within the FieldScout project
3. Enter `npm install`
4. When complete, enter `npm install --save react-router-dom`
5. When complete, enter `npm install reactstrap react react-dom`
6. Open Microsoft Visual Studio Community 2022
7. In the 'Get started' menu, select 'Open a project or solution'
8. Navigate to the FieldScout.sln file, select it, and click open
9. Create the database in VS Community by clicking the View tab at the top left corner followed by SQL Server Object Explorer in the dropdown menu
10. In the SQL Server Object Explorer window, right click on the selection that displays the name of your computer (ex. LAPTOP-EJEKDSI...),
 select 'New query', and execute this [SQL Query](https://github.com/wicamo96/FieldScout/blob/main/SQL/01_FieldScout_Create_DB.sql) - You should now see the FieldScout database in the databases folder
12. Right click the FieldScout database, click 'New query' and execute this [SQL query to populate the data](https://github.com/wicamo96/FieldScout/blob/main/SQL/02_FieldScout_Seed_Data.sql)

### Startup
1. In VS Community, click the solid green 'execute with debugger' triangle to run the back end
2. In a git terminal, navigate to the client folder
3. Enter `npm run dev`
4. A window in your browser should open with a tab running swagger
5. Open a new tab and navigate to http://localhost:5173/ to access Field Scout

## Logged Out Views
### Login
![Login](https://github.com/user-attachments/assets/233fa3f1-f4f6-4bb2-bd48-f385630b4f39)

### Register
![Register](https://github.com/user-attachments/assets/da617c85-2566-4c94-be4b-96fdc35eb104)

## Logged In Views
### Dashboard
![Dashboard](https://github.com/user-attachments/assets/136140fe-325b-4433-b8a2-5fa198489d93)
Upon login, you'll be taken to the dashboard. You'll find a carousel of graphs that are blank by default. Once you have scouting data in the database, you can use the dropdown to view pest trends filtered by house for the past 4 growing weeks

### Greenhouse Management
![Greenhouse Management](https://github.com/user-attachments/assets/1378501f-fd83-4e83-9292-a076e173a60c)
Selecting **Greenhouse Management** in the navbar takes you to portion of the app that allows you to build out data points in
your greenhouse to later input scouting data. The top level allows you to enter the houses within your facility by clicking the
plus sign in the top right corner. There is also the option to edit or delete any existing houses.

![Greenhouse Bay Management](https://github.com/user-attachments/assets/5cd790ec-9d89-4d5b-ac57-ed64402ba8d2)
Similarly, by selecting one of the houses from the left side of the top level menu, you will be taken to the bay management menu.
This allows you to add/edit/delete bays within each house in your facility and also provides a link to the bay divisions menu for each bay
which represents the data collection method used in your facility. 

![Greenhouse Bay Division Management](https://github.com/user-attachments/assets/4cf5ebdf-3316-459d-914c-190b0abf3138)
Finally, by selecting one of the bays from the middle level menu, you will be taken to the bay division management menu. 
This represents data collection methods within each bay (ex. sticky cards) and allows you to input scouting data in the scouting menu.
CRUD functionality is given for bay divisions in the same way as the previous menus.

### Pest Management
![Pest Management](https://github.com/user-attachments/assets/1bfc25a9-20ca-4a35-b8f6-c4cdc6ce86f6)
The **Pest Management** menu allows you to add/edit/delete pests you'd like to track in your facility. 
The 5 most common ornamental pests are provided by default, though this CRUD functionality allows you to tailor your tracking to
whatever pests are most problematic for your crops.

### Scouting
![Scouting](https://github.com/user-attachments/assets/c74038ed-1875-4158-8ed4-57456c4cedc5)
The **Scouting** menu allows you to input data for each data collection point in your facility. The top level menu gives access to the
scouting menu for each house.

![House Scouting](https://github.com/user-attachments/assets/bd4fdb5d-7e1d-4637-b6b3-7a3df559aeed)
Once a house is selected, you will be able to add/edit/delete scouting data for each bay.

![Edit Scouting Data](https://github.com/user-attachments/assets/7702b46d-889d-4476-a403-06abaf536e7b)
A modal populates enabling CRUD functionality

### Trends
![House Selection For Graphs](https://github.com/user-attachments/assets/579407b2-0664-4a94-bce4-3cd3474719a2)
The **Trends** dropdown allows you to visualize scouting data on a graph via **Graph Visualization**.

![Graph View](https://github.com/user-attachments/assets/f8460b49-ebc5-43d4-817a-d8dc2d1e07d7)
Once you select a house, you're given the option to view data through four filters. The pest and timeframe are required, however, the bay and bay division are not allowing you to get as granular as you'd like with the data.

![Facility Map](https://github.com/user-attachments/assets/b38b1dde-7f26-4d47-a82e-68d07c660132)
The **Trends** dropdown also allows you to visualize data with a heat map via **Heat Map**.

![Heat Map](https://github.com/user-attachments/assets/9caa7079-935a-4e7a-92b2-de20170b808e)
Once you select a house, you'll be given a view of the bays and divisions within the house and the option to filter by pest and growing week.

![Heat Map With Filters](https://github.com/user-attachments/assets/eaf6e76a-82b9-41d7-9f91-11e50f331fd0)
Once the filters are selected, the heat map will update with a gradient based on the pest pressure from the week selected. 
