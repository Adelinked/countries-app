# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot

![](https://i.postimg.cc/c1gdnh8G/screenshot.png)

### Links

- Solution URL: [here](https://github.com/Adelinked/countries-app)
- Live Site URL: [here](https://adelinked-countries.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- TypeScript
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styles

### What I learned

i used useSWR to fetch data in the detail page for a selected country, than depending on the result run another fetch request to get its border countries.

useSWR is a React hook for data fetching and caching in client-side applications. It's often used in conjunction with REST APIs to simplify the data fetching process and improve application performance.

With useSWR, you can provide a URL and a function that retrieves data from that URL, and the hook will handle the rest, including caching the data for you. When the data is needed in your component, the hook will return the cached data if it exists, or fetch new data if it doesn't.

## Author

- Website - [Adelinked](https://adelinked.netlify.app)
- Frontend Mentor - [@AAdelinked](https://www.frontendmentor.io/profile/Adelinked)
- Twitter - [@yourusername](https://twitter.com/AAdelinked)
