import { z } from 'zod';

const coordenadasSchema = z.object({
  latitud: z.number(),
  longitud: z.number(),
});

const ubicacionSchema = z.object({
  pais: z.string(),
  ciudad: z.string(),
  codigoPostal: z.string(),
  coordenadas: coordenadasSchema,
});

const contactoSchema = z.object({
  email: z.string().email(),
  telefono: z.string(),
});

const tiendaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  fundadaEn: z.number().int().positive(),
  activa: z.boolean(),
  calificacion: z.number().min(0).max(5),
  ubicacion: ubicacionSchema,
  contacto: contactoSchema,
});

const caracteristicasSchema = z.object({
  pantalla: z.string(),
  procesador: z.string(),
  ram: z.string(),
  almacenamiento: z.string(),
});

const productoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  marca: z.string(),
  precio: z.number().positive(),
  descuento: z.number().min(0).max(1),
  stock: z.number().int().nonnegative(),
  caracteristicas: caracteristicasSchema,
  coloresDisponibles: z.array(z.string()).nonempty(),
});

const subcategoriaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  productos: z.array(productoSchema),
});

const categoriaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  subcategorias: z.array(subcategoriaSchema),
});

const inventarioSchema = z.object({
  totalProductos: z.number().int().nonnegative(),
  categorias: z.array(categoriaSchema),
});

const clienteSchema = z.object({
  id: z.string(),
  nombre: z.number(),
  email: z.string().email(),
  fechaRegistro: z.string(),
});

const estadisticasSchema = z.object({
  tasaDeConversion: z.number().min(0).max(1),
  promedioValorCarrito: z.number().positive(),
});

export const ZodTest = z.object({
  tienda: tiendaSchema,
  inventario: inventarioSchema,
  clientes: clienteSchema,
  estadisticas: estadisticasSchema,
});
