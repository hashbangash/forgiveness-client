# Forgiveness Client

> The whole essence of Zen consists in walking along the razor’s edge of Now — to be so utterly, so completely present that no problem, no suffering, nothing that is not who you are in your essence, can survive in you. In the Now, in the absence of time, all your problems dissolve. Suffering needs time; it cannot survive in the Now.
> The great Zen master Rinzai, in order to take his students’ attention away from time, would often raise his finger and slowly ask:
> What, at this moment, is lacking?
> A powerful question that does not require an answer on the level of the mind. It is designed to take your attention deeply into the Now. A similar question in the Zen tradition is this:
> If not now, when?
- Eckart Tolle | The Power of Now | page 52

#### Live Production Link: [here](https://hashbangash.github.io/forgiveness-client/)
#### Live API Link: [here](https://floating-springs-18499.herokuapp.com/posts)
#### Back-End Repo: [here](https://github.com/hashbangash/forgiveness-API)

## Planning
Before starting, I developed my simple [wireframes and user stories](https://i.imgur.com/uZFe9kz.jpg) and referenced the GA schedule and requirements. I created diagrams of the main four UX views and sketched out the semantic HTML structure.
![main four UX views and sketched out the semantic HTML structure](https://i.imgur.com/uZFe9kz.jpg)

## Software Design/Problem Solving

I was disciplined to truly plan out my wireframes, views, and HTML for a long time before coding. This helped me not get blocked really. For me, this project was relatively easy on the logical challenges. Rails and Handlebars make web development easy. The biggest challenge was designing it all from scratch to be cohesive and thinking like an architect. I absolutely love that.

#### Blocks and how I solved them

I had a server 500 error and it was cool to run some `bin/rails db:rollback` commands to edit my schema. Rails makes it really easy.

#### Code Clarity

My code is really simple and well-commented.

#### Creativity

I took the time to really understand Handlebars, Bootstrap, HTML and CSS on this project. I had so much fun choosing fonts, colors, and images.

#### Technical Requirements

I believe I completed all the MVP project requirements and there are no evident bugs.

#### Stretch Goals

I implemented not just CRUD, but CRRRUD. I met my own goals for styling with mobile and laptop compatibility. I believe I'm able to successfully use Bootstrap, HTML and CSS to make something look professional, and in turn this understanding of UX helps make me a better Full Stack Developer.

## Front-End Tech & Dependencies

I use Node.js for this client because it's a useful JS runtime and handles running code on the browser for me. It makes all the parts of web development that I don't understand yet work. A really cool aspect of it is the [event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ), which means that I/O doesn't get blocked even though the environment is single-threaded. This is why in my code I used callback functions with my event handlers.

Node.js itself has an MIT license. The MIT license is compatible with my project because it can be re-licensed under other licenses. The MIT license is compatible with many copyleft licenses, such as the GNU General Public License (GPL). It is open-source and free, in the sense of 'freedom'.

```json
"dependencies": {
  "babel-polyfill": "^6.26.0",
  "bootstrap": "^4.1.2",
  "jquery": "^3.3.1",
  "popper.js": "^1.14.3"
}
```

Since this is my first Node.js app, I'm listing out what each dependency does for my own learning. The `devDependencies` in `package.json` are tools just used for development, not production.

**babel polyfill**: Transpiles ES6+ code to ES5. A polyfill provides modern functionality for older browsers. Babel is a JS compiler that is now broken into separate small packages. I am just using the polyfill package. Babel has an MIT license.

**bootstrap**: Helps with writing CSS so I can use Sass variables and nest CSS styles. I used the grid system for my tic tac toe board. It also has an MIT license.

**jQuery**: Incredibly valuable JS library that simplifies creating event handlers. Instead of writing complex JS commands to select HTML elements and apply events or styling to them, I can write simple jQuery commands. jQuery has an [MIT license](https://jquery.org/license/). "You are free to use the Project in any other project (even commercial projects) as long as the copyright header is left intact."

**popper.js**: Popper is required dependency for Bootstrap. It has zero dependencies of its own in turn, and helps with positioning of pop-up elements. It has an MIT license.

### Vulnerabilities
GitHub identifies known vulnerabilities in my dependencies. There are quite a few vulnerabilities in the devDependencies. Go ahead, try to break my app!

## Future of this App
Learning how to build an app where I can continually update to current versions of dependencies is a huge priority of mine going forward. This will help keep my apps secure.

#### Image Source
Mount_Everest_as_seen_from_Drukair2.jpg: shrimpo1967 derivative work: Papa Lima Whiskey 2 (talk) (https://commons.wikimedia.org/wiki/File:Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg), „Mount Everest as seen from Drukair2 PLW edit“, https://creativecommons.org/licenses/by-sa/2.0/legalcode.

## [License](LICENSE)
My project has a [GNU General Public License, version 3](https://www.gnu.org/licenses/gpl-3.0.txt). I is GPL-3.0-or-later. The type is [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/), meaning:

You are free to:
* Share — copy and redistribute the material in any medium or format
* Adapt — remix, transform, and build upon the material

Under the following terms:
* Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
* NonCommercial — You may not use the material for commercial purposes.
* ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

More info about this GNU GPLv3 license: Copyright © 2007 [Free Software Foundation, Inc.](https://fsf.org/)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
