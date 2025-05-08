const canvas = document.getElementById("patternCanvas");

const ctx = canvas.getContext("2d");



function clearCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

}



function getMotifFunction(shape, color) {

  return function (ctx) {

    ctx.fillStyle = color;

    switch (shape) {

      case "triangle":

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.lineTo(50, 0);

        ctx.lineTo(25, 40);

        ctx.closePath();

        ctx.fill();

        break;

      case "square":

        ctx.fillRect(0, 0, 40, 40);

        break;

      case "circle":

        ctx.beginPath();

        ctx.arc(20, 20, 20, 0, Math.PI * 2);

        ctx.fill();

        break;

      case "rhombus": // Ketupat

        ctx.beginPath();

        ctx.moveTo(20, 0);

        ctx.lineTo(40, 20);

        ctx.lineTo(20, 40);

        ctx.lineTo(0, 20);

        ctx.closePath();

        ctx.fill();

        break;

      case "parallelogram": // Jajar Genjang

        ctx.beginPath();

        ctx.moveTo(10, 0);

        ctx.lineTo(50, 0);

        ctx.lineTo(40, 40);

        ctx.lineTo(0, 40);

        ctx.closePath();

        ctx.fill();

        break;

      case "arc": // Setengah lingkaran

        ctx.beginPath();

        ctx.moveTo(0, 20);

        ctx.quadraticCurveTo(20, -10, 40, 20);

        ctx.quadraticCurveTo(20, 50, 0, 20);

        ctx.fill();

        break;

      case "star":

        ctx.beginPath();

        let outerRadius = 20;

        let innerRadius = 8;

        let cx = 20, cy = 20;

        for (let i = 0; i < 10; i++) {

          let angle = Math.PI / 5 * i;

          let r = (i % 2 === 0) ? outerRadius : innerRadius;

          let x = cx + r * Math.cos(angle - Math.PI / 2);

          let y = cy + r * Math.sin(angle - Math.PI / 2);

          ctx.lineTo(x, y);

        }

        ctx.closePath();

        ctx.fill();

        break;

        

      case "heart":

        ctx.beginPath();

        ctx.moveTo(20, 35);

        ctx.bezierCurveTo(20, 30, 10, 25, 10, 15);

        ctx.bezierCurveTo(10, 5, 25, 5, 25, 15);

        ctx.bezierCurveTo(25, 5, 40, 5, 40, 15);

        ctx.bezierCurveTo(40, 25, 30, 30, 20, 35);

        ctx.closePath();

        ctx.fill();

        break;

      case "spiral":

        ctx.beginPath();

        let cx2 = 20, cy2 = 20;

        for (let i = 0; i < 100; i++) {

          let angle = 0.2 * i;

          let radius = 0.5 * i;

          let x = cx2 + radius * Math.cos(angle);

          let y = cy2 + radius * Math.sin(angle);

          if (i === 0) ctx.moveTo(x, y);

          else ctx.lineTo(x, y);

        }

        ctx.strokeStyle = color;

        ctx.stroke();

        break;

      default:

        break;

    }

  };

}



function drawShape(ctx, shape, x, y, color) {

  ctx.save();

  ctx.translate(x, y);

  const motif = getMotifFunction(shape, color);

  motif(ctx);

  ctx.restore();

}



function generate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);



  const shape1 = document.getElementById("shape").value;

  const shape2 = document.getElementById("shape2").value;

  const color1 = document.getElementById("color1").value;

  const color2 = document.getElementById("color2").value;

  const repeatCount = parseInt(document.getElementById("repeatCount").value);

  const rowCount = parseInt(document.getElementById("rowCount").value);

  const group = document.getElementById("friezeGroup").value;



  const spacingX = canvas.width / (repeatCount + 1);

  const spacingY = canvas.height / (rowCount + 1);



  for (let row = 0; row < rowCount; row++) {

    let y = (row + 1) * spacingY;



    for (let i = 0; i < repeatCount; i++) {

      const x = (i + 1) * spacingX;



      drawShape(ctx, shape1, x, y, color1);



      if (shape2) {

        switch (group) {

          case "p1":

            drawShape(ctx, shape2, x, y + 40, color2); // Translasi biasa

            break;

          case "pm":

            drawShape(ctx, shape2, x, canvas.height - y, color2); // Refleksi vertikal

            break;

          case "pg":

            drawShape(ctx, shape2, x + spacingX / 2, canvas.height - y, color2); // Glide reflection

            break;

          case "pmm":

            drawShape(ctx, shape2, x, canvas.height - y, color2);

            drawShape(ctx, shape2, canvas.width - x, y, color2);

            break;

          case "pmg":

            drawShape(ctx, shape2, x + spacingX / 2, canvas.height - y, color2);

            drawShape(ctx, shape2, x, canvas.height - y, color2);

            break;

          case "p2":

            drawShape(ctx, shape2, canvas.width - x, canvas.height - y, color2); // Translasi + rotasi 180

            break;

          case "p4":

            drawShape(ctx, shape2, y, x, color2); // Rotasi simulasi

            break;

        }

      }

    }

  }

}



 
