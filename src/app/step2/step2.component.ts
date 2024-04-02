import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ModelSelect } from '../models/model-select';
import { ModelObjects, ModelOptions } from '../models/model-options';
import { TeslaService } from '../services/tesla.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
  providers: [TeslaService]
})
export class Step2Component implements OnInit {

  level2Form!: FormGroup;
  selectedModel!: ModelSelect;
  optionsModel!: ModelOptions;
  optionObjects!: ModelObjects
  colorCode!: string


  constructor(private teslaService: TeslaService) {}

  ngOnInit(): void {
    this.level2Form = new FormGroup({
      configSelect: new FormControl('', [Validators.required]),
      includeTow: new FormControl('', [Validators.required]),
      includeYoke: new FormControl('', [Validators.required]),
    });
    this.getOptions()
  }

  async getOptions() {
    this.selectedModel = JSON.parse(localStorage.getItem('carInfo') || '{}');
    this.colorCode = JSON.parse(localStorage.getItem('colorCode') || '{}');
    (await this.teslaService.getOptions(this.colorCode)).subscribe((res) => {
      if (Object.keys(res ?? {}).length > 0) {
        this.optionsModel = res
        this.level2Form.setValue({
          configSelect: '',
          includeTow: this.optionsModel.towHitch,
          includeYoke: this.optionsModel.yoke
        });
      }
      if (localStorage['carConfigInfo']) {
        let storageValue: ModelSelect = JSON.parse(localStorage.getItem('carConfigInfo') || '{}');
        this.level2Form.patchValue({
          configSelect: storageValue.config,
          includeTow: storageValue.tow,
          includeYoke: storageValue.yoke
        });
        this.optionsModel.configs.filter((res, index) => {
          if(index === parseInt(this.level2Form.get('configSelect')?.value)){
            this.optionObjects = res
          }
        });
      }
    });
  }

  onChange() {
    this.optionsModel.configs.filter((res, index) => {
      if(index === parseInt(this.level2Form.get('configSelect')?.value)){
        this.optionObjects = res
      }
    });
    let selectedOption = new ModelSelect();
    selectedOption.code = this.selectedModel.code;
    selectedOption.color = this.selectedModel.color;
    selectedOption.config = this.level2Form.get('configSelect')?.valid ? this.level2Form.get('configSelect')?.value : '';
    selectedOption.tow = this.level2Form.get('includeTow')?.value
    selectedOption.yoke = this.level2Form.get('includeYoke')?.value
    localStorage.setItem('carConfigInfo', JSON.stringify(selectedOption))
  }

}
