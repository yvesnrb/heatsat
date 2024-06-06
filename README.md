![heatsat logo](https://github.com/yvesnrb/heatsat/blob/main/screenshots/logo.png?raw=true)

# HeatSat

This repository is my submission for the Atlas+DEV Hackaton 2021. You
can see more information
[here](https://dev.to/yvesnrb/heatsat-1nhm). It went on to win a
runner up prize on the "prime time" category, you can see more
information
[here](https://dev.to/devteam/congrats-to-the-mongodb-atlas-hackathon-winners-4cc0).

# Screen Shots

Browsing all data points: 
![browsing data points](https://github.com/yvesnrb/heatsat/blob/main/screenshots/datapoints.gif?raw=true)

Browsing regions:
![browsing regions](https://github.com/yvesnrb/heatsat/blob/main/screenshots/regions.gif?raw=true)

Browsing data points in a region:
![browsing a single region](https://github.com/yvesnrb/heatsat/blob/main/screenshots/region.gif?raw=true)

# About the Stack

Besides the Hackaton's requirement of a MongoDB time series database,
this project uses NextJS to implement a full stack web
application. The application can scrape satellite information
periodically, organaze it into a time series and serve a minimal React
front end to browse the data points in a Google Maps interface. There
is no pre packaged styling library as I chose to control the look and
feel of this project, but it does use [HeadlessUI](https://tailwindcss.com/blog/headless-ui-v1) to provide zero style
components and [TailwindCSS](https://tailwindcss.com/blog/headless-ui-v1) in lieu of writting CSS.






