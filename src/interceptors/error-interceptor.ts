import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
                public alertCtrl: AlertController){
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
                        break;
                    case 401:
                        this.handle401();
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                        break;
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle403(){ // HTTP 403 = Nao Autorizado 
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: "Erro 401: falha de autenticacao",
            message: "Email ou senha incorretos",
            enableBackdropDismiss: false,
            buttons: [{
                text: "Ok"
            }]
        });

        alert.present();
    }

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: "Erro "+ errorObj.status + ": " + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{
                text: "Ok"
            }]
        });

        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};