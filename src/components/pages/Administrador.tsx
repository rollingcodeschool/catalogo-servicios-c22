import { Link } from "react-router";
import ItemTabla from "../services/ItemTabla";
import { LuCirclePlus } from "react-icons/lu";
import type { Servicio } from "../../interfaces/servicios";
import { useEffect, useState } from "react";
import { listarServiciosApi } from "../../helpers/queries";

const Administrador = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cantidadServicios, setCantidadServicios] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limitePorPagina = 10;

  useEffect(() => {
    cargarServicios(paginaActual);
  }, [paginaActual]);

  const cargarServicios = async (pagina = 1) => {
    setIsLoading(true);
    try {
      const respuestaServicios = await listarServiciosApi({ pagina, limite: limitePorPagina });
      if (respuestaServicios && respuestaServicios.ok) {
        const datos = await respuestaServicios.json();
        setServicios(datos.servicios ?? []);
        setCantidadServicios(datos.cantidadServicios ?? 0);
        setTotalPaginas(datos.totalPaginas ?? 1);
        if (typeof datos.paginaActual === 'number') setPaginaActual(datos.paginaActual);
      } else {
        setServicios([]);
        setCantidadServicios(0);
        setTotalPaginas(1);
      }
    } catch (error) {
      console.error(error);
      setServicios([]);
      setCantidadServicios(0);
      setTotalPaginas(1);
    } finally {
      setIsLoading(false);
    }
  };

  const cambiarPagina = (pagina: number) => {
    if (pagina < 1 || pagina > totalPaginas || pagina === paginaActual) return;
    setPaginaActual(pagina);
  };

  const getVisiblePages = (current: number, total: number, maxButtons = 7) => {
    // returns array of numbers and '...' strings
    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: Array<number | string> = [];
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    pages.push(1);

    if (left > 2) pages.push('...');

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) pages.push('...');

    pages.push(total);
    return pages;
  };

  return (
    <section className="animate-fadeIn space-y-6">
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración
          </h1>
          <p className="text-zinc-500 text-sm">
            Gestiona el catálogo de servicios disponibles.
          </p>
        </div>
        <Link to={'/administrador/crear'} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center gap-2">
         <LuCirclePlus />
          Crear Servicio
        </Link>
      </div>

      {/* Contenedor de la Tabla con Scroll Horizontal para móviles */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-800">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                #
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Servicio
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Precio
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
           {servicios.length > 0 ? (
              servicios.map((servicio, indice) => (
                <ItemTabla
                  key={servicio._id}
                  servicio={servicio}
                  fila={(paginaActual - 1) * limitePorPagina + (indice + 1)}
                  setServicios={setServicios}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-zinc-500 italic"
                >
                  No hay servicios registrados para administrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <div className="text-sm text-zinc-400">Mostrando {servicios.length} de {cantidadServicios} resultados</div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => cambiarPagina(paginaActual - 1)}
              className="px-3 py-1 rounded-md text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
            >
              Anterior
            </button>

            {getVisiblePages(paginaActual, totalPaginas, 7).map((p, i) => (
              typeof p === 'string' ? (
                <span key={`dots-${i}`} className="px-3 py-1 text-sm text-zinc-500">{p}</span>
              ) : (
                <button
                  key={`page-${p}`}
                  type="button"
                  onClick={() => cambiarPagina(p)}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors border ${p === paginaActual ? 'bg-blue-600 text-white border-blue-600' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200'}`}
                >
                  {p}
                </button>
              )
            ))}

            <button
              type="button"
              disabled={paginaActual === totalPaginas}
              onClick={() => cambiarPagina(paginaActual + 1)}
              className="px-3 py-1 rounded-md text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Administrador;
