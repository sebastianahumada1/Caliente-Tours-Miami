import SunsetBlur from '@/components/SunsetBlur';

// Layout específico para login que no requiere autenticación
// NO incluye Header aquí porque el layout de /admin ya lo incluye
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SunsetBlur />
      {children}
    </>
  );
}
