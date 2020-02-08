

import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[appConfrimEqualValidator]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:ConfrimEqualValidatorDirective,
        multi:true
    }]

})

export class ConfrimEqualValidatorDirective implements Validator{
    @Input() appConfrimEqualValidator: string;
          validate(control:AbstractControl): {[key:string]:any} | null{
                  const controlToCompare = control.parent.get(this.appConfrimEqualValidator);
                  if (controlToCompare && controlToCompare.value !== control.value){
                      return { 'notEqual' : true};
                  }

                  return null;
          }
}