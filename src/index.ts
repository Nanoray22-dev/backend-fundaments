import express, { Request, Response } from 'express';

const app = express();
const port  = 3000;
interface Heroes{
  id: number,
  name: String,
  alte: String,
}


const heroes:Heroes[] = [
  {
    id:1,
    name: "Bruce Wayne",
    alte: "Batman"
  },
  {
    id:2,
    name: "Damian Wayne",
    alte: "Robin"
  },
  { id:3,
    name: "Clark kent",
    alte: "SuperMan"
  }
]
// function hola(formatear:CallableFunction){
//   formatear()
// }


app.get('/heroe',(req:Request, res:Response) => {
  res.json(heroes);
});

app.get('/heroe/:alte',(req:Request, res:Response) =>{
  const alte = req.params.alte;
  const id = req.params.id;

 
  const  heroe =heroes.find((hero: Heroes) =>hero.alte.toLowerCase() === alte.toLowerCase() )
     
     if(!heroe){
      return res.status(404).json(
        {
          message: 'Super hero no Found'
        }
      );
     }
     res.json(heroe);
});

app.listen(port, () => {
    console.log(`The application is listening on port 3000!${port}`);
})