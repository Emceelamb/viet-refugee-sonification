import dynamic from "next/dynamic";
const Sketch = dynamic(import("react-p5"), { ssr: false });
export const SketchComponent = ({ data }) => {
  let yOff = 100; // 2nd dimension of perlin noise

  const canvasX = 600;
  console.log(canvasX, p5.windowWidth, "window")
  const canvasY = 400;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasX, canvasY).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background("#e5e7eb");
    p5.fill(33);
    p5.beginShape();
    let xOff = 0;
    for (let x = 0; x <= p5.width; x += 10) {
      let y = p5.height - p5.map(p5.noise(xOff, yOff), 1, 0, p5.map(+data, 0, 500000, 0, p5.height ), 0) - 60;
      p5.vertex(x, y);
      xOff += 0.05;
    }
    yOff += 0.01;
    p5.vertex(p5.width, p5.height);
    p5.vertex(0, p5.height);
    p5.endShape(p5.CLOSE);
  };
  return <Sketch setup={setup} draw={draw} />;
};
