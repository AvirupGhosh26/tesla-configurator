export class ModelOptions {
    configs!: {
      id: number;
      description: string;
      range: number;
      speed: number;
      price: number;
    }[];
  
    towHitch!: boolean;
    yoke!: boolean;
  }

  export class ModelObjects {
      id!: number;
      description!: string;
      range!: number;
      speed!: number;
      price!: number;
  }
