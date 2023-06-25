const canvas = document.getElementById("root");
canvas.width = 1024;
canvas.height = 576;

const ctx = canvas.getContext("2d");
ctx.width = canvas.width;
ctx.height = canvas.height;

const gravity = 1.5;

export { ctx, gravity };
