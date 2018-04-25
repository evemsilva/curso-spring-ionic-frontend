import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("Passou pelo interceptor");

        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error; // Cast para obter somente propriedade error
                }

                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj); // Caso não estiver formato JSON, fará cast. 
                }

                console.log("Erro detectado pelo interceptor");
                console.log(errorObj);

                switch(errorObj.status){
                    case 403:
                        this.handle403();
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle403(){ // HTTP 403 = Nao Autorizado 
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};