import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProdutoDTO } from "../../models/produto.dto";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(produto_id: string): Observable<ProdutoDTO> {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number): Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType: "blob"});
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: "blob"});
    }

}