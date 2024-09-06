import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsEmail,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

class Coordenadas {
  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;
}

class Ubicacion {
  @IsString()
  pais: string;

  @IsString()
  ciudad: string;

  @IsString()
  codigoPostal: string;

  @ValidateNested()
  @Type(() => Coordenadas)
  coordenadas: Coordenadas;
}

class Contacto {
  @IsEmail()
  email: string;

  @IsString()
  telefono: string;
}

class Tienda {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsNumber()
  fundadaEn: number;

  @IsBoolean()
  activa: boolean;

  @IsNumber()
  @Min(0)
  @Max(5)
  calificacion: number;

  @ValidateNested()
  @Type(() => Ubicacion)
  ubicacion: Ubicacion;

  @ValidateNested()
  @Type(() => Contacto)
  contacto: Contacto;
}

class Caracteristicas {
  @IsString()
  pantalla: string;

  @IsString()
  procesador: string;

  @IsString()
  ram: string;

  @IsString()
  almacenamiento: string;
}

class Producto {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  marca: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  descuento: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @ValidateNested()
  @Type(() => Caracteristicas)
  caracteristicas: Caracteristicas;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  coloresDisponibles: string[];
}

class Subcategoria {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @ValidateNested({ each: true })
  @Type(() => Producto)
  productos: Producto[];
}

class Categoria {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @ValidateNested({ each: true })
  @Type(() => Subcategoria)
  subcategorias: Subcategoria[];
}

class Inventario {
  @IsNumber()
  @Min(0)
  totalProductos: number;

  @ValidateNested({ each: true })
  @Type(() => Categoria)
  categorias: Categoria[];
}

class Cliente {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  fechaRegistro: string;
}

class Estadisticas {
  @IsNumber()
  @Min(0)
  @Max(1)
  tasaDeConversion: number;

  @IsNumber()
  @Min(0)
  promedioValorCarrito: number;
}

export class ClassValidatorTestDto {
  @ValidateNested()
  @Type(() => Tienda)
  tienda: Tienda;

  @ValidateNested()
  @Type(() => Inventario)
  inventario: Inventario;

  @ValidateNested()
  @Type(() => Cliente)
  clientes: Cliente;

  @ValidateNested()
  @Type(() => Estadisticas)
  estadisticas: Estadisticas;
}
