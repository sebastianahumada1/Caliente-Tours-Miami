# Configuración de Supabase

Esta guía te ayudará a configurar Supabase para el proyecto Caliente Tours.

## Paso 1: Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta (si no la tienes)
2. Crea un nuevo proyecto
3. Espera a que se complete la configuración del proyecto (esto puede tomar unos minutos)

## Paso 2: Configurar Storage para Imágenes

1. En tu proyecto de Supabase, ve a **Storage** en el menú lateral
2. Haz clic en **Create bucket**
3. Configura el bucket:
   - **Name:** `boat-images`
   - **Public bucket:** ✅ Marca esta opción (para acceso público a las imágenes)
   - **File size limit:** 10MB (o el límite que prefieras)
   - **Allowed MIME types:** `image/jpeg, image/png, image/webp` (opcional)
4. Haz clic en **Create bucket**

## Paso 3: Ejecutar el Schema SQL

1. En tu proyecto de Supabase, ve a **SQL Editor** en el menú lateral
2. Haz clic en **New Query**
3. Abre el archivo `supabase/schema.sql` de este proyecto
4. Copia todo el contenido del archivo y pégalo en el editor SQL
5. Haz clic en **Run** o presiona `Ctrl+Enter` (o `Cmd+Enter` en Mac)

Esto creará:
- La tabla `boats` con todos los campos necesarios
- Índices para búsquedas rápidas
- Políticas de seguridad (RLS)
- Datos de ejemplo (3 botes con URLs externas - puedes actualizarlos después)

## Paso 4: Configurar Políticas de Storage (Opcional)

1. En el **SQL Editor**, abre una nueva query
2. Abre el archivo `supabase/storage-setup.sql` de este proyecto
3. Copia el contenido y pégalo en el editor SQL
4. Haz clic en **Run**

Esto configurará las políticas de Storage para permitir:
- Lectura pública de imágenes (todos pueden ver)
- Opcionalmente: escritura solo para usuarios autenticados (descomenta si lo necesitas)

## Paso 5: Obtener las credenciales de API

1. En tu proyecto de Supabase, ve a **Settings** > **API**
2. Copia los siguientes valores:
   - **Project URL** (URL del proyecto)
   - **anon public** key (clave pública anónima)

## Paso 6: Configurar variables de entorno

1. Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
2. Copia el contenido de `.env.local.example` a `.env.local`
3. Reemplaza los valores con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_aqui
```

**Importante:** 
- No compartas nunca tu archivo `.env.local`
- Está incluido en `.gitignore` por defecto
- Las claves `NEXT_PUBLIC_*` son seguras para usar en el cliente (son públicas)

## Paso 7: Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

## Paso 8: Subir Imágenes al Storage

1. Ve a **Storage** > **boat-images** en Supabase
2. Haz clic en **Upload file** o **Upload folder**
3. Organiza las imágenes en carpetas por bote:
   ```
   boat-images/
     ├── sunset-seeker/
     │   ├── main.jpg
     │   ├── 1.jpg
     │   └── 2.jpg
     ├── ocean-oasis/
     │   ├── main.jpg
     │   └── 1.jpg
     └── neon-wave/
         ├── main.jpg
         └── 1.jpg
   ```
4. Después de subir, actualiza los registros en la tabla `boats`:
   - Ve a **Table Editor** > **boats**
   - Actualiza `main_image` con la ruta de Storage (ej: `sunset-seeker/main.jpg`)
   - Actualiza `images` con un array de rutas (ej: `{sunset-seeker/1.jpg, sunset-seeker/2.jpg}`)

**Nota:** Las rutas en la base de datos deben ser relativas al bucket (sin `boat-images/` al inicio).

## Paso 9: Verificar la conexión

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Visita `http://localhost:3000/catalogo`
3. Deberías ver los botes cargados desde Supabase

## Estructura de la base de datos

### Tabla: `boats`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único (generado automáticamente) |
| `title` | TEXT | Título del bote (ej: "Sunset Seeker") |
| `main_image` | TEXT | Ruta en Storage o URL completa (ej: `sunset-seeker/main.jpg`) |
| `max_capacity` | INTEGER | Capacidad máxima de personas |
| `price_per_hour` | DECIMAL | Precio por hora |
| `images` | TEXT[] | Array de rutas en Storage o URLs completas (ej: `{sunset-seeker/1.jpg, sunset-seeker/2.jpg}`) |
| `catalog_link` | TEXT | Link opcional al catálogo externo |
| `category` | TEXT | Categoría del bote (ej: "Van Dutch Premium") |
| `length` | TEXT | Longitud del bote (ej: "80ft") |
| `description` | TEXT | Descripción del bote |
| `features` | TEXT[] | Array de características del bote |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

## Seguridad (RLS - Row Level Security)

La tabla tiene Row Level Security habilitado:
- **Lectura:** Pública (todos pueden leer)
- **Escritura:** Puedes configurar políticas adicionales según tus necesidades

Para permitir que usuarios autenticados inserten/actualicen/eliminen:
1. Ve a **Authentication** > **Policies** en Supabase
2. Crea políticas personalizadas según tus necesidades

## Actualizar datos de botes

Puedes actualizar los botes directamente desde:
1. **Table Editor** en Supabase Dashboard
2. SQL Editor ejecutando queries UPDATE
3. El código de la aplicación (si configuras políticas de escritura)

## Subir imágenes al Storage

### Desde el Dashboard:
1. Ve a **Storage** > **boat-images**
2. Haz clic en **Upload file** o arrastra archivos
3. Organiza en carpetas por bote (ej: `sunset-seeker/main.jpg`)

### Desde el código (funciones helper):
```typescript
import { uploadImageToStorage } from '@/lib/storage';

// Ejemplo de uso
const file = /* archivo File */;
const path = 'sunset-seeker/main.jpg';
const url = await uploadImageToStorage(file, path);
```

### Rutas en la base de datos:
- ✅ Correcto: `sunset-seeker/main.jpg`
- ❌ Incorrecto: `boat-images/sunset-seeker/main.jpg` (no incluir el nombre del bucket)

El código automáticamente convierte las rutas de Storage a URLs completas usando `getStorageImageUrl()`.

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Verifica que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo después de crear/actualizar `.env.local`

### No se muestran los botes
- Verifica que ejecutaste el schema SQL correctamente
- Revisa la consola del navegador para errores
- Verifica las credenciales en `.env.local`

### Error de conexión a Supabase
- Verifica que tu proyecto de Supabase está activo
- Verifica que las URLs y claves son correctas
- Asegúrate de que tu conexión a internet funciona
