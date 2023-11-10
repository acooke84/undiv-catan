// DICE

const binomials: number[][] = [
  [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1],
  [1,5,10,10,5,1],
  [1,6,15,20,15,6,1],
  [1,7,21,35,35,21,7,1],
  [1,8,28,56,70,56,28,8,1],
];

function binomial(n: number, k: number) {
  while(n >= binomials.length) {
    let s = binomials.length;
    let nextRow = [];
    nextRow[0] = 1;
    for(let i=1, prev=s-1; i<s; i++) {
      nextRow[i] = binomials[prev][i-1] + binomials[prev][i];
    }
    nextRow[s] = 1;
    binomials.push(nextRow);
  }
  return binomials[n][k];
};


class Die {
  public readonly sides: number;

  constructor(sides: number) {
    this.sides = sides;
  }

  public roll(): number {
    return Math.floor(Math.random() * (this.sides) + 1);
  }
};

export class Dice {
  private diceCount: number;
  private sides: number;
  private dice: Die[];
  public readonly rolls: number[];
  public readonly probabilities: number[];


  constructor(diceCount: number, sides: number) {
    this.diceCount = diceCount;
    this.sides = sides;
    this.dice = Array.from({length: diceCount}).map((_, i) => new Die(sides));
    this.rolls = Array.from({length: (sides * diceCount) - diceCount + 1}, (_, i) => i + diceCount);
    this.probabilities = this.rolls.map((i, _) => this.probabilityOf(i));
  }

  public clear(): void {
    this.dice = [];
  }

  public roll(): number {
    return this.dice.reduce((sum, die) => sum + die.roll(), 0);
  }

  private massFunction(p: number, k: number) {
    const first_term = Math.pow(-1, k);
    const second_term = binomial(this.diceCount, k);
    const third_term = binomial(p - this.sides * k - 1, this.diceCount - 1);
    return first_term * second_term * third_term;
  }

  private probabilityOf(roll: number): number {
    const kmax: number = Math.max(0, Math.floor((roll - this.diceCount) / this.sides)) + 1;
    const coef: number = 1 / Math.pow(this.sides, this.diceCount);
    const sum = Array.from(Array(kmax).keys()).reduce((sum, k) => sum + this.massFunction(roll, k), 0);
    return coef * sum;
  }
};

export const DefaultDice: Dice = new Dice(2, 6);

