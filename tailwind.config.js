/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway'],
        staatliches: ['Staatliches'],
        clickerscript: ['Clicker Script'],
        moondance: ['Moon Dance'],
        quintessential: ['Quintessential'],
      },
      keyframes: {
        "rotate-vertical-spin": {
          "0%,100": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(360deg)" },
        },
        "slide-slowly-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "bounce-high": {
          "0%, 100%": { transform: "translateY(0rem)" },
          // "50%": { transform: "translateY(-135%)" },
          "50%": { transform: "translateY(-250%) scaleY(1.1)" },
        },
        "celebrate-button": {
          "0%, 100%": { transform: "translateY(0rem) scale(1)" },
          "50%": { transform: "scale(1.25) translateY(-15%)" },
        },
        "typewriter": {
          "0%, 100%": { transform: "translateY(0rem) rotate(0deg) scale(1)" },
          "50%": {
            transform: "translateY(-0.75rem) rotate(-12deg) scale(1.5)",
            color: "rgb(115 115 115)",
          },
        },
        "fast-shake": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-22deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(22deg)" },
        },
        "blob": {
          "0%": { transform: "translate(0px,0px) scale(1)" },
          "33%": { transform: "translate(30px,-50px) scale(1.2)" },
          "66%": { transform: "translate(-20px,20px) scale(0.8)" },
          "100%": { transform: "translate(0px,0px) scale(1)" },
        },
        "subtle-celebrate": {
          "0%": { transform: "scale(1)" },
          "25%": { transform: " scale(1.05)" },
          "50%": { transform: " scale(1)" },
          "75%": { transform: " scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "grow-textbox": {
          "0%": { transform: "scale(0)" },
          // "25%": { transform: "scale(0.25)" },
          // "50%": { transform: "scale(0.5)" },
          // "75%": { transform: "scale(0.75)" },
          "100%": { transform: "scale(1)" },
        },
        "shrink-textbox": {
          "0%": { transform: "scale(1)" },
          // "25%": { transform: "scale(0.75)" },
          // "50%": { transform: "scale(0.5)" },
          // "75%": { transform: "scale(0.25)" },
          "100%": { transform: "scale(0)" },
        },

        "flap": {
          '0%': { transform: 'rotateY(720deg) scale(0) translateY(200%)' },
          // '50%': { transform: 'scale(2)' },
          '100%': { transform: 'rotateY(0deg) scale(1) translateY(0%)' },
        },
        "bubbleRise": {
          '0%': { transform: ' scale(0) translateY(200%)' },
          '50%': { transform: 'scale(3)' },
          '100%': { transform: ' scale(1) translateY(0%)' },
        }
      },
      animation: {
        "flap": 'flap 2s ease-in-out alternate 1',
        "bubbleRise": 'bubbleRise 2s linear 1',
        "celebrate-button": "celebrate-button 0.3s ease-in-out 1",
        "spin-fast": "spin 0.3s ease-in-out 1",
        "typewriter": "typewriter 0.15s linear 1",
        "fast-shake": "fast-shake 0.15s linear infinite",
        "blob": "blob 20s infinite ",
        "subtle-celebrate": "subtle-celebrate 0.3s ease-in-out 1 ",
        "grow-textbox": "grow-textbox 0.5s ease-out 1",
        "shrink-textbox": "shrink-textbox 0.5s ease-in forwards",
        "bounce-high": "bounce-high 2s ease-in infinite",
        "slide-slowly-from-left": "slide-slowly-from-left 2s ease-in 1",
        "rotate-vertical-spin": "rotate-vertical-spin 1s ease-in 2"

      }
    },
  },
  plugins: [],
}

