import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimulationByPerson } from '../models/simulationByPerson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private readonly http: HttpClient) {
  }

  getSimulationsByPerson(): Observable<SimulationByPerson[]> {
    return this.http.get<SimulationByPerson[]>("http://localhost:8080/simuladorSalarial/simulacoes");

  }
}
