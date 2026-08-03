import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { formatearPrecio } from "../../utils/formateador";
import { buscarServicioApi } from "../../helpers/queries";
import type { Servicio } from "../../interfaces/servicios";
const DetalleServicio = () => {
  const { id } = useParams<{ id: string }>();
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerServicio();
  }, []);

  const obtenerServicio = async () => {
    if (!id) return;
    const respuesta = await buscarServicioApi(id);
    if (respuesta && respuesta.status === 200) {
      const data = await respuesta.json();
      setServicio(data);
    } else {
      navigate("/404", { replace: true });
    }
  };

  if (!servicio) {
    return null;
  }

  const categoria =
    typeof servicio.categoria === "string"
      ? servicio.categoria
      : servicio.categoria?.nombre ?? "Sin categoría";

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {servicio.nombreServicio}
      </h2>
      <img
        src={servicio.imagen}
        alt={servicio.nombreServicio}
        className="w-full h-64 object-cover rounded mb-4 border border-zinc-700"
      />
      <p className="text-lg mb-2">
        <span className="font-semibold">Precio: </span>
        {formatearPrecio(servicio.precio)}
      </p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Categoría:</span> {categoria}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Descripción:</span>{" "}
        {servicio.descripcion}
      </p>
      <Link
        to="/"
        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
      >
        Volver
      </Link>
    </div>
  );
};

export default DetalleServicio;
