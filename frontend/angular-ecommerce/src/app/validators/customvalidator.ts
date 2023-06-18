import { FormControl, ValidationErrors } from '@angular/forms';

export class Customvalidator {
    static onlyWhitespace(control: FormControl) : ValidationErrors {
        if((control.value != null) && (control.value.trim().length == 0)){
            return { 'onlyWhitespace': true };
        }
        else {
            return null;
        }
    }
    static containsSpaces(control: FormControl) : ValidationErrors {
        if((control.value!=null) && (control.value as string).indexOf(' ')>=0) {
            return { 'containsSpaces': true };
        }
        else {
            return null;
        }
    }
}
