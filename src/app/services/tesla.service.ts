import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelResponse } from '../models/model-response';
import { Observable } from 'rxjs';
import { ModelOptions } from '../models/model-options';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

constructor(private httpClient: HttpClient) { }

 async getModels(): Promise <Observable<ModelResponse[]>>{
    return this.httpClient.get<ModelResponse[]>('/models');
  }

  async getOptions(id: string): Promise <Observable<ModelOptions>>{
    return this.httpClient.get<ModelOptions>(`/options/${id}`);
  }
}
