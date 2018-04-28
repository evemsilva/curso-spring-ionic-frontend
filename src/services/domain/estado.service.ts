import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EstadoService {

    constructor(public httpClient: HttpClient) {
    }

    findAll(): Observable<EstadoDTO[]> {
        return this.httpClient.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}