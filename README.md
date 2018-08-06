# Tic-Tac-Toe

Coding assignment for Zendesk. A tic-tac-toe webapp made with React.js. Live demo available at https://bijan-massoumi.github.io/

### Installing

Run the app locally with the following sequence of commands: (If you don't have npm/ node, install them here: https://www.npmjs.com/get-npm)

```
git clone https://github.com/Bijan-Massoumi/ZenDesk-Homework.git
cd ZenDesk-Homework
npm install
npm start
```

### Features
    - The game enforces the conditions of X's win, O's win, as well as the draw condition.
    - The game allows for undo-ing one turn at a time. To do this, it stores all previous board states.
    - The board can be scaled up to a 5 x 5, 7 x 7, etc simply by editing the "size" member in the Game constructor.  
    - The board can be reset at any time back to the original state.
    - There is updated info text to keep track of whose turn it is and who has won.
    
## Built With

* [React.js](https://reactjs.org/) - The web framework used
* [Foundation Grid](https://foundation.zurb.com/grid.html) - Css to simplify laying elements.
* [Font Awesome] (https://fontawesome.com/) - Where the refresh logo is from.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
