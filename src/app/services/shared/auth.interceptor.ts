import { Injectable } from "@angular/core";

import { HttpInterceptor,
         HttpRequest,
        HttpHandler } 
from "@angular/common/http";

import { TokenService } from "../shared/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //console.log(req.url)

        //intercepto la peticion http reviso en la url si contiene admini
        //SI lo contiene se utiliza el token de laravel api
        //SINO utiliza el token de wordpress
        if(this.tokenService.isLoggedIn())
        { 

            var url = req.url

            var re = "admini"; 
            if (url.search(re) == -1 ) { 
                const accessToken = this.tokenService.getTokenWp();
                req = req.clone({
                    setHeaders: {
                        Authorization: "Bearer " + accessToken
                        //Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b3JkcHJlc3MiLCJpYXQiOjE2NTMxMDM0MDAsIm5iZiI6MTY1MzEwMzQwMCwiZXhwIjoxNjUzNzA4MjAwLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.nFj7jOENndYA-xm9J5GM6Tw1mZA77sOwI6vYqDpXLZM"
                    }
                });

                //console.log(req)

            } else { 


                const accessToken = this.tokenService.getToken();

                console.log("Contains admini" );
                //console.log(accessToken); 
 
                req = req.clone({
                    setHeaders: {
                        Authorization: "Bearer " + accessToken
                        //Authorization: "Bearer mF_s9.B5f-4.1JqM"
                    }
                });
            }
        } 
        
        
        return next.handle(req);
    }
}