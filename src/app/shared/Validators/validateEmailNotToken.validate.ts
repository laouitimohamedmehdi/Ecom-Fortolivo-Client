import { Injectable } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms";
import { map, of, switchMap, timer } from "rxjs";
import { AccountService } from "../../account/account.service";

@Injectable({ providedIn: 'root' })

export class EmailValidator {

    constructor(private accountService: AccountService) { }

    ValidateEmailNotToken():AsyncValidatorFn {
        return contorls =>{
            return timer(1000).pipe(
                switchMap(()=>{
                    if(!contorls.value)
                    {
                        return of(null);
                    }
                    return this.accountService.checkEmailExist(contorls.value).pipe(
                        map(res=>{
                            return res?{emailExists:true}:null;
                        })
                    )
                })
            )
        }
    }
}