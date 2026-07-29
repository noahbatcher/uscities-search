# Goal
Create a web app that uses a pre-existing microservice to search a database of cities.  
It should be able to search by ZIP code or city name.  

## Micro-Service Description
- https://nbatcher-uscities-microservices-g2f0hzewhkgdb0as.eastus-01.azurewebsites.net/ is the base link
- When adding uscities-search/12345 to the end it will search for zip codes 12345 and return the data in json form.
- When adding uscities-search/cincinnati to the end it will search for cincinnati and return the data in json form.
- Example: https://nbatcher-uscities-microservices-g2f0hzewhkgdb0as.eastus-01.azurewebsites.net/uscities-search/12345
  Returns: [{"city":"Schenectady","state_id":"NY","state_name":"New York","county_name":"Schenectady","timezone":"America/New_York","zips":"12305 12308 12307 12309 12304 12301 12325 12345"}]

## Behavior requirements:
- For searching use the micro-service (see micro-service Description section)
- Search using the micro-service every 50ms when there is more than 1 character in the text box.
- Also search using the micro-service when the user pushes the search button or presses enter.
- When searching by ZIP code: if the user enters 6 or more numbers, display **City Not Found**.
- When searching by city name: display **City Not Found** if no match exists.

# Files to Create
**index.html** — UI and basic security checks (DOMPurify).  
**client.js** — All logic for interacting with the microservice.  
**styles.css** — UI styling and optional animations.

# Extra Fun Requirement
If the city isn't found, make a radioactive-looking warning go off like crazy.  
Just for fun.
