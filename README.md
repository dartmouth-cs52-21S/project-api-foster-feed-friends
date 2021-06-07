# FOSTER-FEED-FRIENDS

<img width="1440" alt="Screen Shot 2021-06-07 at 4 26 23 PM" src="https://user-images.githubusercontent.com/31497093/121083623-ab2c2a00-c7ad-11eb-9905-81c5337b29ff.png">

[mockups](https://www.figma.com/file/Hcpn03bH20z84UQfOMYEGj/?node-id=0%3A1) 

## Architecture

- mongodb
  - User Collection with log in information (ie. Name, Username, Password, Email, Hometown/City, foster or organization, path/purpose etc) 
  - Path Resources Colletion (e.g: College, Workforce, Military, Technical School/Bootcamps) 
  - events for organizations
- passport for security
- bycrypt for password encryption

## Setup

- run npm install and npm start. 

## Deployment

- heroku for this api: Procfile set up to run on [heroku](https://foster-project.herokuapp.com/api)
- npm start if running locally, switch const ROOT_URL from 'https://foster-project.herokuapp.com/api' to 'http://localhost:9090/api';

## Authors - The Best

- Gebriel Belaineh --Backend
- Juliet Elisa Giraso -- Backend
- Muhtasim Miraz--Backend
- Karina Montiel -- Frontend
- Melissa Valencia -- Frontend
- William Perez -- Frontend

## Acknowledgments
CS52 Professor Tim Tregubov

CS52 21S TAs 
- Jordan Sanz
- Catherine Parnell
- Thomas Monfre
- Yaouri Ahang
