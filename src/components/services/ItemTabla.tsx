import { Link } from "react-router";


const ItemTabla = () => {
 

  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        1
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        maquetado
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        $200
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          <Link 
            className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1" 
            to={``}
          >
            <i className="bi bi-pencil-square"></i> Editar
          </Link>
          <button 
           
            className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <i className="bi bi-trash"></i> Borrar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTabla;