import { Button } from "./components/Button";

function App() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button>Botón primario</Button>
      <Button variant="outline">Botón outline</Button>
      <Button variant="destructive">Botón destructivo</Button>
      
      {/* Botón con rounded activado */}
      <Button rounded>Este es un botón redondeado</Button>
    </div>
  );
}

export default App;