class Sky {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  initCanvas() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawOverlayer() {
    let gradient = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      250,
      this.width / 2,
      this.height / 2,
      this.width / 2
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.9)");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  gnerateStars(count) {
    let stars = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 3 + 2;
      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: radius,
        orginRadius: radius,
        color: "#fff",
        speed: Math.random() + 0.25
      });
    }

    this.stars = stars;
  }

  updateStars() {
    this.stars.forEach(star => {
      star.x += star.speed;
      star.y -= (star.speed * (this.width / 2 - star.x)) / 2350;
      star.radius = star.orginRadius * (Math.random() / 4 + 0.89);

      if (star.x > this.width + 2 * star.radius) {
        star.x = -2 * star.radius;
      }
    });
  }

  clearCanvas() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawStars() {
    this.stars.forEach(star => {
      this.drawStar(star);
    });
  }

  drawStar(star) {
    this.ctx.save();
    this.ctx.fillStyle = star.color;
    this.ctx.beginPath();
    this.ctx.translate(star.x, star.y);
    this.ctx.moveTo(0, 0 - star.radius);
    for (let i = 0; i < 5; i++) {
      this.ctx.rotate((Math.PI / 180) * 36);
      this.ctx.lineTo(0, 0 - star.radius * 0.55);
      this.ctx.rotate((Math.PI / 180) * 36);
      this.ctx.lineTo(0, 0 - star.radius);
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  draw() {
    this.clearCanvas();
    this.drawStars();
    this.updateStars();
    this.drawOverlayer();
    window.requestAnimationFrame(() => this.draw());
  }

  run() {
    this.initCanvas();
    this.gnerateStars(400);
    this.draw();
  }
}

const sky = new Sky(document.querySelector("#canvas"));
sky.run();
