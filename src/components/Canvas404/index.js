import React, { useState } from "react";

const Canvas404 = () => {
  /*I use this for reload my canvas with right size when someone 
  resize the page*/
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [words, setWords] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  //Random value
  const randomValue = (min, max) => Math.random() * (max - min) + min;

  //moves the texts in x, the bigger the word the faster it goes
  const move = (value, in_min, in_max, out_min, out_max) =>
    ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  const txt_min_size = 5;
  const txt_max_size = 25;

  const canvas = React.useRef();
  const id = React.useRef();

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    //add Event listernet for resize
    window.addEventListener("resize", handleWindowResize);

    //create an array of 150 words "ERROR 404" with random x,y and size
    const createArray = (array) => {
      return array.length !== 150
        ? createArray([
            ...array,
            {
              x: randomValue(0, windowSize.innerWidth),
              y: randomValue(0, windowSize.innerHeight),
              text: "ERROR 404",
              size: randomValue(txt_min_size, txt_max_size)
            }
          ])
        : array;
    };

    //if words is empty we filled
    if (words.length === 0) {
      setWords(createArray(words));
    }

    //returns a drawing context on the canvas
    const ctx = canvas.current.getContext("2d");

    //draws the window with the black square and the text ERROR 404 in color
    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, windowSize.innerWidth, windowSize.innerHeight);
      setWords(
        words.map((word, index) => {
          const wordDraw = { ...word };
          ctx.font = wordDraw.size + "px sans-serif";
          ctx.fillStyle =
            "rgb(" +
            Math.floor(100 - index) +
            "," +
            Math.floor(0 + index) +
            "," +
            255 +
            ")";
          const pixel = ctx.measureText(wordDraw.text);
          ctx.fillText(wordDraw.text, wordDraw.x, wordDraw.y);

          wordDraw.x += move(wordDraw.size, txt_min_size, txt_max_size, 1, 2);

          if (wordDraw.x >= windowSize.innerWidth) {
            wordDraw.x = -pixel.width * 2;
            wordDraw.y = randomValue(0, windowSize.innerHeight);
            wordDraw.size = Math.floor(randomValue(txt_min_size, txt_max_size));
          }
          return wordDraw;
        })
      );
      ctx.fill();
      id.current = requestAnimationFrame(draw);
    };
    id.current = requestAnimationFrame(draw);
    return () => {
      //remove Event listernet for resize
      window.removeEventListener("resize", handleWindowResize);
      cancelAnimationFrame(id.current);
    };
  }, [setWords, windowSize.innerWidth, windowSize.innerHeight, words]);

  return (
    <canvas
      ref={canvas}
      height={windowSize.innerHeight}
      width={windowSize.innerWidth}
    />
  );
};

export default Canvas404;
