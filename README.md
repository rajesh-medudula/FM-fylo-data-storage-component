# Frontend Mentor - Fylo data storage component solution

This is a solution to the [Fylo data storage component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/fylo-data-storage-component-1dZPRbV5n). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

---

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
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size.

This project was originally limited to **HTML and CSS**, but I improvised it by extending the functionality using **JavaScript with the help of AI (ChatGPT)**.

Additional features implemented using JavaScript:

- Dynamic storage usage updates
- Interactive progress bar
- Desktop input-based storage control
- Mobile pop-up slider control
- LocalStorage persistence
- Breakpoint-based UI reinitialization (1024px)
- Smooth animated transitions
- Input validation and limits (0–1000 GB)
- Automatic input width resizing

---

### Screenshot

![](/screenshot.jpg)

---

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/fylo-data-storage-mobile-first-responsive-using-flex-box-GnXddUDQ_k]
- Live Site URL: [https://rajesh-medudula.github.io/FM-fylo-data-storage-component/]

---

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Responsive design principles
- Vanilla JavaScript (DOM manipulation)
- Local Storage API
- `matchMedia` for breakpoint detection

---

### What I learned

This project helped me strengthen my understanding of:

- Responsive layout development using a mobile-first approach
- Styling custom range inputs
- Creating animated progress bars
- Managing separate mobile and desktop interactions
- Persisting UI state using localStorage
- Updating UI dynamically without page refresh
- Writing cleaner, modular JavaScript functions

Example of percentage calculation logic:

```js
function calculatePercentage(value, max) {
  return Math.round((value / max) * 100);
}

mainProgress.style.width = percentage + "%";
localStorage.setItem("usedStorage", usedValue);

## Continued development

In future projects, I want to:

- Improve animation smoothness  
- Structure JavaScript in a more modular pattern  
- Enhance accessibility (ARIA roles and keyboard support)  
- Improve validation feedback UX  
- Rebuild similar projects using React or other frameworks  

---

## Resources used

- **Frontend Mentor community solutions** – Useful for layout inspiration.  
- **ChatGPT** – Used for debugging, structuring logic, and refining the final implementation.  

---

## AI Collaboration

This challenge was originally limited to HTML and CSS. I extended the functionality using JavaScript with the help of **ChatGPT**.

### How AI was used:

- Debugging JavaScript logic  
- Refactoring and removing duplicate code  
- Structuring functions properly  
- Handling responsive breakpoint logic  
- Implementing localStorage persistence  
- Improving overall code readability  

AI was used as a development assistant to enhance productivity and improve code quality.

---

## Author

- **Name** – Rajesh Medudula 
- **Frontend Mentor** – "https://www.frontendmentor.io/profile/dark1010101010"
- **GitHub** – "https://github.com/rajesh-medudula" 

---

## Acknowledgments

Thanks to Frontend Mentor for providing practical UI challenges that help improve real-world development skills.
