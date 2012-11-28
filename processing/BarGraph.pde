class BarGraph {

  BarGraph()
  {
  }

  void draw()
  {
    drawBaseLines();
  }

  void update()
  {
  }

  void drawBaseLines()
  {
    stroke(0, 0, 0);
    line(50, 50, 50, 400);
    line(50, 400, 400, 400);
  }
}

