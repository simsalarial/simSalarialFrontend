import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimulationByPerson } from '../models/simulationByPerson';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private readonly http: HttpClient) {
  }

  getSimulationsByPerson(): Promise<Array<SimulationByPerson>> {
    //return this.http.get<   >("http://localhost:8080/api/simulations").toPromise();


    return new Promise((resolve, reject) => {
      // resolve([ new Simulation({id: 1, baseSalary: 2432}) ]);
    });
  }
}
