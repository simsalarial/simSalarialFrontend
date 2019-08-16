import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimulationByPerson } from '../models/simulationByPerson';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private readonly http: HttpClient) {
  }

  getSimulationsByPerson(): Promise<SimulationByPerson[]> {
    return this.http.get<SimulationByPerson[]>("http://localhost:8080/simuladorSalarial/simulacoes").toPromise();

  }
}
