import { useState, useEffect } from "react";
import StarshipCard from "./StarshipCard";


export default function Starships() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        
        // Validamos si la respuesta HTTP es correcta
        if (!response.ok) {
          throw new Error("Error en la respuesta de la red");
        }

        const result = await response.json();
        setData(result.results);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos de las naves.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 1. Early return si está cargando
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  // 2. Early return si ocurrió un error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">¡Ops! Algo salió mal</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Renderizado principal cuando los datos están listos
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
        Naves de Star Wars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ship) => (
          <StarshipCard key={ship.model || ship.name} ship={ship} />
        ))}
      </div>
    </div>
  );
}