export class User {

    name: string;
    gender: string;
    subtype: string;
    status: string;

    constructor(name: string, gender: string, subtype: string, status: string) {

        this.name = name
        this.gender = gender
        this.subtype = subtype
        this.status = status

    }

    toString(): string {
        return `{ "name": "${this.name}", "gender": "${this.gender}", "subtype": "${this.subtype}", "status": "${this.status}" }`
      }
       

}

