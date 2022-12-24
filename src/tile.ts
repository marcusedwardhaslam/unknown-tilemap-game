export class Tile {
  constructor(private colour: string) {}

  getColour() {
    return this.colour;
  }

  setColour(colour: string) {
    this.colour = colour;
  }
}
