import Link from 'next/link';
import Header from '@/components/Header';

export default function AdminPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold italic uppercase tracking-tighter mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Gestiona el contenido del sitio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="/admin/boats/new"
            className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-secondary/30 transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="size-10 sm:size-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">directions_boat</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Agregar Bote</h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Agrega un nuevo bote al catálogo con todas sus imágenes y detalles
            </p>
          </Link>

          <Link
            href="/admin/boats"
            className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-secondary/30 transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="size-10 sm:size-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl">edit</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Editar Botes</h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Ver y editar todos los botes existentes
            </p>
          </Link>

          <Link
            href="/catalogo"
            className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-secondary/30 transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="size-10 sm:size-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">view_list</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Ver Catálogo</h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Ver todos los botes en el catálogo público
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
