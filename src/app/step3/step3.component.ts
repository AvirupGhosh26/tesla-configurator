import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../services/tesla.service';
import { ModelSelect } from '../models/model-select';
import { ModelResponse } from '../models/model-response';
import { ModelObjects, ModelOptions } from '../models/model-options';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
  providers:[TeslaService]
})
export class Step3Component implements OnInit{

  selectedModel!: ModelSelect;
  modelResponse!: ModelResponse;
  colorCode!: string;
  storageValue!:ModelSelect;
  optionObjects!: ModelObjects;
  newConfigDescription!: string

  constructor(private teslaService: TeslaService) {}

  ngOnInit(): void {
   this.getOptions()
  }

  async getOptions() {
    this.selectedModel = JSON.parse(localStorage.getItem('carInfo') || '{}');
    this.colorCode = JSON.parse(localStorage.getItem('colorCode') || '{}');
    this.storageValue = JSON.parse(localStorage.getItem('carConfigInfo') || '{}');
    (await this.teslaService.getModels()).subscribe((res) => {
        res.filter((x, index) =>{
          if((index).toString() === this.selectedModel.code){
            this.modelResponse = x
          }
        })
    });
    (await this.teslaService.getOptions(this.colorCode)).subscribe((value) => {
      if (Object.keys(value).length > 0) {
       value.configs.filter((res, index) => {
        console.log(res, index)
          if(index == this.storageValue.config){
            this.optionObjects = new ModelObjects()
            this.optionObjects = res
          }
        });
      }
    })
  }

  getSetDescription(val: string){
    const parts = val.split(' - ');
    const result = parts.length > 1 ? parts[1] : val.split('-')[1];
    return result
  }

  getInfo() {
    return this.modelResponse.colors[this.modelResponse.colors.findIndex(x => x.code == this.selectedModel.color)]
  }

  getTotal() {
    let total = this.optionObjects?.price +
      this.getInfo().price;
    if (this.storageValue.tow)
      total += 1000;
    if (this.storageValue.yoke)
      total += 1000;
    return total;
  }

}
