import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as Promise from "bluebird";
import RouteHello from "./routes/Hello";
//Print stack trace with TS lines numbers
import 'source-map-support/register';


//TODO delete
enum hola{
    MKIO = 0,
    HOLA,
    MIJO
}

type MyStringEnum = "member1" | "member2";
const MyStringEnum = {
    Member1: "member1" as MyStringEnum,
    Member2: "member2" as MyStringEnum
};

class MyClass {
    attr: MyStringEnum;
    set(param: MyStringEnum){
        this.attr = param;
    }
    greatting() : Promise<string>{
        return new Promise<string>((resolve, reject)=>{
            resolve(MyStringEnum.Member1);
        });
    }

}
let myClass = new MyClass ();
myClass.set(MyStringEnum.Member1);
myClass.attr;
console.log(myClass.attr, hola.MIJO);
//TODO end delete

const app = express();

app.use(express.static('./'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/hello', RouteHello);//'/hello', );
app.use((req, res)=> {
    res.sendFile(path.resolve('index.html'));
});



export default app;
