export const drawRoulette = (
  ctx: CanvasRenderingContext2D,
  width: number,
  selectors: { name: string; color: string }[],
  spinAngle: number
) => {
  const radius = width / 2;
  const angleStep = (2 * Math.PI) / selectors.length;

  selectors.forEach((selector, index) => {
    const startAngle = index * angleStep + spinAngle;
    const endAngle = (index + 1) * angleStep + spinAngle;

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = selector.color;
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(startAngle + angleStep / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(selector.name, radius - 10, 10);
    ctx.restore();
  });
};
