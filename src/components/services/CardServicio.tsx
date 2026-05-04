


const CardServicio = () => {

  return (
    <article className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex flex-col h-full">
      {/* Contenedor de Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src=''
          alt=''
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-zinc-950/80 backdrop-blur-sm text-blue-400 text-xs font-bold px-2 py-1 rounded border border-zinc-700 uppercase tracking-wider">
            categoria
          </span>
        </div>
      </div>

      {/* Cuerpo de la Card */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-blue-400 transition-colors">
          nombreServicio
        </h3>
        
        <p className="text-zinc-400 text-sm line-clamp-3 mb-4 flex-grow">
          descripcion
        </p>

        <div className="pt-4 border-t border-zinc-800 mt-auto">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-zinc-500 uppercase font-semibold">Precio</p>
              <p className="text-lg font-mono text-zinc-200">
                precio
              </p>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md shadow-blue-900/20 active:scale-95">
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardServicio;