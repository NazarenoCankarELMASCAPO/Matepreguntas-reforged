class Entity {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;

    this.vx = 16;
    this.vy = 16;

    this.angle = 0;
    this.vAngle = 4;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.rotate(this.angle);

    ctx.drawImage(this.img, -this.w / 2, -this.w / 2, this.w, this.h);

    ctx.restore();
  }

  update(ctx, dt) {
    this.draw(ctx);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.angle += this.vAngle * dt;
  }
}
