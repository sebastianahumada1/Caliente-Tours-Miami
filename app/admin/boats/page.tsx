import Link from 'next/link';
import Header from '@/components/Header';
import { getAllBoats } from '@/lib/boats';
import Image from 'next/image';

export default async function BoatsListPage() {
  const boats = await getAllBoats();

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold italic uppercase tracking-tighter mb-2">
            Lista de Botes
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Gestiona y edita todos los botes del catálogo
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <Link
            href="/admin/boats/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Agregar Nuevo Bote
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 border border-white/20 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Volver
          </Link>
        </div>

        {boats.length === 0 ? (
          <div className="text-center py-12 bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-6">
            <p className="text-gray-400 text-lg mb-4">No hay botes disponibles</p>
            <Link
              href="/admin/boats/new"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Agregar Primer Bote
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {boats.map((boat) => (
              <div
                key={boat.id}
                className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-secondary/30 transition-all group"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={boat.mainImage || '/images/placeholder.jpg'}
                    alt={boat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {boat.collection && (
                    <div className="absolute top-3 left-3 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
                      {boat.collection}
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{boat.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-400">
                    <span>{boat.length}</span>
                    <span>•</span>
                    <span>{boat.capacity} personas</span>
                    {boat.category && (
                      <>
                        <span>•</span>
                        <span>{boat.category}</span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/boats/${boat.slug}/edit`}
                      className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors text-center"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/catalogo/${boat.slug}`}
                      className="flex-1 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors text-center"
                      target="_blank"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
