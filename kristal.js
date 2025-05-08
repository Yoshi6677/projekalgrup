
// kristal.js

const canvas = document.getElementById("kristalCanvas");

const ctx = canvas.getContext("2d");





function clearCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

}



function getMotifFunction(shape, color) {

  return function (ctx) {

    ctx.fillStyle = color;

    switch (shape) {

      case "square":

        ctx.fillRect(-20, -20, 40, 40);

        break;

      case "circle":

        ctx.beginPath();

        ctx.arc(0, 0, 20, 0, Math.PI * 2);

        ctx.fill();

        break;

      case "triangle":

        ctx.beginPath();

        ctx.moveTo(0, -20);

        ctx.lineTo(20, 20);

        ctx.lineTo(-20, 20);

        ctx.closePath();

        ctx.fill();

        break;

      case "star":

        ctx.beginPath();

        let outer = 20, inner = 8;

        for (let i = 0; i < 10; i++) {

          let angle = Math.PI / 5 * i;

          let r = i % 2 === 0 ? outer : inner;

          let x = r * Math.cos(angle);

          let y = r * Math.sin(angle);

          if (i === 0) ctx.moveTo(x, y);

          else ctx.lineTo(x, y);

        }

        ctx.closePath();

        ctx.fill();

        break;

      case "hexagon":

        ctx.beginPath();

        let size = 20;

        for (let i = 0; i < 6; i++) {

          let angle = Math.PI / 3 * i;

          let x = 20 + size * Math.cos(angle);

          let y = 20 + size * Math.sin(angle);

          if (i === 0) ctx.moveTo(x, y);

          else ctx.lineTo(x, y);

        }

        ctx.closePath();

        ctx.fill();

        break;

      case "crescent":

        ctx.beginPath();

        ctx.arc(25, 20, 20, 0.2 * Math.PI, 1.8 * Math.PI, false);

        ctx.arc(18, 20, 15, 1.8 * Math.PI, 0.2 * Math.PI, true);

        ctx.closePath();

        ctx.fill();

        break;

      case "flower":

        for (let i = 0; i < 5; i++) {

          ctx.beginPath();

          let angle = (2 * Math.PI / 5) * i;

          let x = 20 + 10 * Math.cos(angle);

          let y = 20 + 10 * Math.sin(angle);

          ctx.arc(x, y, 6, 0, 2 * Math.PI);

          ctx.fill();

        }

        ctx.beginPath();

        ctx.arc(20, 20, 5, 0, 2 * Math.PI); // pusat

        ctx.fill();

        break;

      case "diamondStar":

        ctx.beginPath();

        ctx.moveTo(20, 0);

        ctx.lineTo(30, 20);

        ctx.lineTo(20, 40);

        ctx.lineTo(10, 20);

        ctx.closePath();

        ctx.fill();



        ctx.beginPath();

        ctx.moveTo(0, 20);

        ctx.lineTo(20, 30);

        ctx.lineTo(40, 20);

        ctx.lineTo(20, 10);

        ctx.closePath();

        ctx.fill();

        break;

      case "wave":

        ctx.beginPath();

        ctx.moveTo(0, 20);

        ctx.quadraticCurveTo(10, 0, 20, 20);

        ctx.quadraticCurveTo(30, 40, 40, 20);

        ctx.lineTo(40, 40);

        ctx.lineTo(0, 40);

        ctx.closePath();

        ctx.fill();

        break;

      case "eye":

        ctx.beginPath();

        ctx.ellipse(20, 20, 20, 10, 0, 0, Math.PI * 2);

        ctx.fill();

        ctx.beginPath();

        ctx.fillStyle = "#000";

        ctx.arc(20, 20, 5, 0, Math.PI * 2);

        ctx.fill();

        break;

      case "spikedCircle":

        ctx.beginPath();

        let spikes = 12;

        for (let i = 0; i < spikes; i++) {

          let angle = (2 * Math.PI / spikes) * i;

          let r = i % 2 === 0 ? 20 : 10;

          let x = 20 + r * Math.cos(angle);

          let y = 20 + r * Math.sin(angle);

          if (i === 0) ctx.moveTo(x, y);

          else ctx.lineTo(x, y);

        }

        ctx.closePath();

        ctx.fill();

        break;

      case "kite":

        ctx.beginPath();

        ctx.moveTo(20, 0);

        ctx.lineTo(35, 20);

        ctx.lineTo(20, 40);

        ctx.lineTo(5, 20);

        ctx.closePath();

        ctx.fill();

        break;

      case "pinwheel":

        for (let i = 0; i < 4; i++) {

          ctx.save();

          ctx.translate(20, 20);

          ctx.rotate(i * Math.PI / 2);

          ctx.beginPath();

          ctx.moveTo(0, 0);

          ctx.lineTo(10, 0);

          ctx.lineTo(0, 10);

          ctx.closePath();

          ctx.fill();

          ctx.restore();

        }

        break;

      default:

        break;

    }

  };

}



function drawPattern(groupType, motif1, motif2, repeatX = 10, repeatY = 6) {

  const dx = 60, dy = 60;

  for (let y = 0; y < repeatY; y++) {

    for (let x = 0; x < repeatX; x++) {

      ctx.save();

      ctx.translate(x * dx + 40, y * dy + 40);



      switch (groupType) {

        case "p1":

          motif1(ctx);

          break;

        case "p2":

          if ((x + y) % 2 === 0) ctx.rotate(Math.PI);

          motif1(ctx);

          break;

        case "pm":

          if (y % 2 === 1) ctx.scale(-1, 1);

          motif1(ctx);

          break;

        case "pg":

          ctx.translate((y % 2) * dx / 2, 0);

          motif1(ctx);

          break;

        case "cm":

          if ((x + y) % 2 === 1) ctx.scale(-1, 1);

          motif1(ctx);

          break;

        case "pmm":

          ctx.scale(x % 2 === 0 ? 1 : -1, y % 2 === 0 ? 1 : -1);

          motif1(ctx);

          break;

        case "pmg":

          ctx.translate((y % 2) * dx / 2, 0);

          if (y % 2 === 1) ctx.scale(-1, 1);

          motif1(ctx);

          break;

        case "cmm":

          ctx.rotate(((x + y) % 2) * Math.PI);

          motif1(ctx);

          break;

        case "p4":

          ctx.rotate((x % 4) * Math.PI / 2);

          motif1(ctx);

          break;

        case "p4m":

          ctx.scale((x % 2) ? -1 : 1, (y % 2) ? -1 : 1);

          ctx.rotate((x % 4) * Math.PI / 2);

          motif1(ctx);

          break;

        case "p4g":

          ctx.rotate((x % 4) * Math.PI / 2);

          ctx.translate((y % 2) * dx / 2, 0);

          motif1(ctx);

          break;

        case "p3":

          ctx.rotate((x % 3) * 2 * Math.PI / 3);

          motif1(ctx);

          break;

        case "p3m1":

          ctx.scale((x % 2 ? -1 : 1), 1);

          ctx.rotate((y % 3) * 2 * Math.PI / 3);

          motif1(ctx);

          break;

        case "p31m":

          ctx.rotate((x % 3) * 2 * Math.PI / 3);

          ctx.scale((y % 2 ? -1 : 1), 1);

          motif1(ctx);

          break;

        case "p6":

          ctx.rotate((x % 6) * Math.PI / 3);

          motif1(ctx);

          break;

        case "p6m":

          ctx.rotate((x % 6) * Math.PI / 3);

          if (y % 2 === 1) ctx.scale(-1, 1);

          motif1(ctx);

          break;

        default:

          motif1(ctx);

      }



      if (motif2) {

        ctx.translate(20, 20);

        motif2(ctx);

      }



      ctx.restore();

    }

  }

}



function generateKristal() {

  clearCanvas();

  const shape1 = document.getElementById("shape1").value;

  const shape2 = document.getElementById("shape2").value;

  const color1 = document.getElementById("color1").value;

  const color2 = document.getElementById("color2").value;

  const group = document.getElementById("crystalGroup").value;

  const repeatX = parseInt(document.getElementById("repeatX").value);

  const repeatY = parseInt(document.getElementById("repeatY").value);



  const motif1 = getMotifFunction(shape1, color1);

  const motif2 = shape2 ? getMotifFunction(shape2, color2) : null;



  drawPattern(group, motif1, motif2, repeatX, repeatY);

}









document.getElementById("generateBtn").addEventListener("click", generateKristal);

