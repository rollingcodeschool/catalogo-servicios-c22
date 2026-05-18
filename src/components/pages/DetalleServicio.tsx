import { Link } from "react-router";
const DetalleServicio = () => {
    return (
        <div className="max-w-xl mx-auto bg-zinc-900 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Nombre del servicio</h2>
            <img
                src='https://images.pexels.com/photos/6980355/pexels-photo-6980355.jpeg'
                alt='ejemplo'
                className="w-full h-64 object-cover rounded mb-4 border border-zinc-700"
            />
            <p className="text-lg mb-2">
                <span className="font-semibold">Precio:</span> $00,00
            </p>
            <p className="text-lg mb-2">
                <span className="font-semibold">Categoría:</span> categoria
            </p>
            <p className="mb-4">
                <span className="font-semibold">Descripción:</span> descripcion
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