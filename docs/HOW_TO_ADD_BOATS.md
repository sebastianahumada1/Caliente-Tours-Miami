# Guía: Cómo Agregar Botes a la Base de Datos

Hay varias formas de agregar botes a la base de datos. Te recomendamos usar la forma más fácil al inicio y luego avanzar a opciones más automatizadas.

## Opción 1: Desde el Dashboard de Supabase (Recomendado para empezar)

### Paso 1: Subir imágenes al Storage

1. Ve a **Storage** > **boat-images** en Supabase
2. Haz clic en **Upload file** o **Upload folder**
3. Crea una carpeta para cada bote (ej: `nuevo-bote`)
4. Sube las imágenes:
   - `nuevo-bote/main.jpg` - Imagen principal
   - `nuevo-bote/1.jpg`, `nuevo-bote/2.jpg`, etc. - Imágenes adicionales

### Paso 2: Agregar el bote en Table Editor

1. Ve a **Table Editor** > **boats** en Supabase
2. Haz clic en **Insert** > **Insert row**
3. Completa los campos:

| Campo | Ejemplo | Notas |
|-------|---------|-------|
| `title` | "Sunset Seeker" | Nombre del bote |
| `main_image` | `nuevo-bote/main.jpg` | **Ruta relativa** en Storage (sin `boat-images/`) |
| `max_capacity` | `12` | Número de personas |
| `price_per_hour` | `1200.00` | Precio decimal (mantener para compatibilidad) |
| `pricing` | Ver abajo | Campo JSONB para precios flexibles (opcional) |
| `images` | `{nuevo-bote/1.jpg, nuevo-bote/2.jpg}` | Array de rutas (usa `{}` para arrays) |
| `category` | `Van Dutch Premium` | Categoría del bote |
| `length` | `80ft` | Longitud del bote |
| `description` | `Yate espacioso...` | Descripción completa |
| `features` | `{Cocina, Bar, Jacuzzi}` | Array de características |

**Importante:**
- Las rutas de imágenes deben ser relativas al bucket (ej: `nuevo-bote/main.jpg`)
- Los arrays usan `{}` no `[]`
- El código automáticamente convertirá las rutas a URLs completas

### Paso 2.1: Configurar Pricing (Opcional pero Recomendado)

El campo `pricing` permite dos formatos de precios. Si no lo configuras, se usará `price_per_hour` como fallback.

#### Formato 1: Precios por hora que varían por día ("hourly")

Para botes con precios diferentes en fines de semana vs días de semana:

```json
{
  "type": "hourly",
  "weekday": 180,
  "weekend": 210,
  "minimum_hours": 2
}
```

**En el Table Editor:** Copia el JSON completo en el campo `pricing` (asegúrate de que el tipo de campo sea JSONB).

**Ejemplo visual:**
- $210 per hour (weekends)
- $180 per hour (Monday through Thursday)
- Minimum 2 hours

#### Formato 2: Precios fijos por cantidad de horas ("fixed")

Para botes con precios fijos por paquetes de horas:

```json
{
  "type": "fixed",
  "prices": {
    "3H": 900,
    "4H": 1050,
    "5H": 1250,
    "6H": 1500
  }
}
```

**En el Table Editor:** Copia el JSON completo en el campo `pricing`.

**Ejemplo visual:**
- 3H — $900
- 4H — $1,050
- 5H — $1,250
- 6H — $1,500

**Nota:** Si `pricing` está vacío o es NULL, el componente usará `price_per_hour` y calculará precios automáticamente.

### Ejemplo de datos completos:

```json
{
  "title": "Sunset Seeker",
  "main_image": "sunset-seeker/main.jpg",
  "max_capacity": 12,
  "price_per_hour": 1200.00,
  "images": ["sunset-seeker/1.jpg", "sunset-seeker/2.jpg"],
  "category": "Van Dutch Premium",
  "length": "80ft",
  "description": "Yate espacioso y elegante perfecto para eventos especiales y cruceros relajantes.",
  "features": ["Cocina completa", "Sala de estar", "Baños privados", "Sistema de sonido"]
}
```

## Opción 2: Usando SQL (Para agregar múltiples botes)

### Ventajas:
- Más rápido para agregar muchos botes a la vez
- Puedes copiar/pegar fácilmente

### Paso 1: Subir imágenes al Storage
(Sigue el mismo proceso que en la Opción 1)

### Paso 2: Ejecutar SQL

1. Ve a **SQL Editor** en Supabase
2. Copia y pega este template:

```sql
INSERT INTO boats (title, main_image, max_capacity, price_per_hour, pricing, images, category, length, description, features) 
VALUES (
  'Nombre del Bote',
  'ruta-en-storage/main.jpg',  -- Ejemplo: 'nuevo-bote/main.jpg'
  12,                          -- Capacidad máxima
  1200.00,                     -- Precio por hora (mantener para compatibilidad)
  '{"type": "hourly", "weekday": 180, "weekend": 210, "minimum_hours": 2}'::jsonb,  -- Pricing (opcional)
  ARRAY['ruta-imagen1.jpg', 'ruta-imagen2.jpg'],  -- Array de imágenes
  'Categoría',                 -- Ejemplo: 'Van Dutch Premium'
  '80ft',                      -- Longitud
  'Descripción completa del bote aquí...',
  ARRAY['Característica 1', 'Característica 2', 'Característica 3']
);
```

3. Reemplaza los valores con los datos de tu bote
4. Ejecuta la query

### Ejemplo SQL completo con pricing tipo "hourly":

```sql
INSERT INTO boats (title, main_image, max_capacity, price_per_hour, pricing, images, category, length, description, features) 
VALUES (
  '26'' 🩷 PINK BAYLINER',
  'boat-images/26-pink-bayliner/main.jpg',
  11,
  210.00,
  '{"type": "hourly", "weekday": 180, "weekend": 210, "minimum_hours": 2}'::jsonb,
  ARRAY['boat-images/26-pink-bayliner/1.jpg', 'boat-images/26-pink-bayliner/2.jpg'],
  'Bayliner',
  '26ft',
  'Pink Bayliner de 26 pies con capacidad para 11 personas.',
  ARRAY['Velocidad', 'Comodidad', 'Sistema de sonido']
);
```

### Ejemplo SQL con pricing tipo "fixed":

```sql
INSERT INTO boats (title, main_image, max_capacity, price_per_hour, pricing, images, category, length, description, features) 
VALUES (
  'Luxury Yacht',
  'luxury-yacht/main.jpg',
  16,
  300.00,
  '{"type": "fixed", "prices": {"3H": 900, "4H": 1050, "5H": 1250, "6H": 1500}}'::jsonb,
  ARRAY['luxury-yacht/1.jpg', 'luxury-yacht/2.jpg', 'luxury-yacht/3.jpg'],
  'Super Yacht',
  '100ft',
  'Yate de lujo con todas las comodidades para eventos exclusivos.',
  ARRAY['Helipuerto', 'Piscina', 'Spa', 'Cine privado', 'Gimnasio']
);
```

## Opción 3: Panel de Administración (Futuro - Requiere desarrollo)

Puedes crear un panel de administración en tu aplicación Next.js que permita:
- Subir imágenes directamente
- Formulario para agregar/editar botes
- Vista previa antes de guardar

**Ejemplo de componente (futuro):**

```typescript
// app/admin/boats/new/page.tsx (ejemplo futuro)
import { uploadImageToStorage } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

export default function NewBoatPage() {
  // Formulario para agregar botes
  // Con subida de imágenes
  // Validación de datos
}
```

## Recomendación de Flujo de Trabajo

### Para agregar 1-3 botes:
✅ **Usa la Opción 1 (Table Editor)** - Es la más rápida y visual

### Para agregar 5+ botes:
✅ **Usa la Opción 2 (SQL)** - Copia el template y ajusta los valores

### Para producción con muchos botes:
✅ **Desarrolla la Opción 3 (Panel Admin)** - Para mayor eficiencia a largo plazo

## Tips Importantes

1. **Nombres de carpetas en Storage:**
   - Usa nombres en minúsculas
   - Usa guiones en lugar de espacios (ej: `sunset-seeker` no `Sunset Seeker`)
   - Mantén consistencia en el naming

2. **Imágenes:**
   - Formato recomendado: JPG o WebP
   - Tamaño máximo: 10MB (o el que configuraste en el bucket)
   - Imagen principal: Nombra siempre `main.jpg`

3. **Arrays en SQL:**
   - Usa `ARRAY['item1', 'item2']` no `['item1', 'item2']`
   - O usa `{}` en el Table Editor: `{item1, item2}`

4. **Verificar después de agregar:**
   - Visita tu sitio: `http://localhost:3000/catalogo`
   - Verifica que las imágenes se muestren correctamente
   - Revisa la consola del navegador por errores

## Troubleshooting

### Las imágenes no se muestran:
- Verifica que las rutas en la BD sean correctas (relativas al bucket)
- Verifica que el bucket sea público
- Verifica que las políticas de Storage estén configuradas

### Error al insertar:
- Verifica que todos los campos requeridos (NOT NULL) estén llenos
- Verifica el formato de los arrays
- Verifica que el precio sea un número decimal válido

### Duplicados:
- El campo `id` se genera automáticamente (UUID)
- Si quieres evitar duplicados, agrega un `UNIQUE` constraint al campo `title`
