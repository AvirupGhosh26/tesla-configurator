import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelResponse } from '../models/model-response';
import { ModelSelect } from '../models/model-select';
import { TeslaService } from '../services/tesla.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    NgFor,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
  providers: [TeslaService]
})
export class Step1Component implements OnInit {

  level1Form!: FormGroup;
  models!: ModelResponse[];
  selectedModel!: ModelSelect;
  colorCode!: string
  storageValue!: ModelSelect;

  constructor(private teslaService: TeslaService) { }

  ngOnInit(): void {
    this.level1Form = new FormGroup({
      modelSelect: new FormControl('', [Validators.required]),
      colorSelect: new FormControl('', [Validators.required]),
    });
    this.getModel()
  }

  async getModel() {
    (await this.teslaService.getModels()).subscribe((res) => {
      if (res.length > 0) {
        this.models = res
      }
      if (localStorage['carInfo'] && localStorage['colorCode']) {
        this.selectedModel = JSON.parse(localStorage.getItem('carInfo') || '{}')
        this.colorCode = JSON.parse(localStorage.getItem('colorCode') || '{}')
        this.level1Form.patchValue({
          modelSelect: this.selectedModel.code,
          colorSelect: this.selectedModel.color
        });
      }
    });
  }

  onChange() {
    this.selectedModel = new ModelSelect()
    this.selectedModel.code = this.level1Form.value?.modelSelect
    this.selectedModel.color = this.level1Form.value?.colorSelect
    localStorage.setItem('carInfo', JSON.stringify(this.selectedModel))
  }

  onSelectModel() {
    if (this.level1Form.get('modelSelect')?.valid) {
      this.models.filter((res, i) => {
        if ((i.toString() === this.level1Form.value?.modelSelect)) {
          this.colorCode = res.code
          localStorage.setItem('colorCode', JSON.stringify(this.colorCode))
        }
      })
    }
  }

}


