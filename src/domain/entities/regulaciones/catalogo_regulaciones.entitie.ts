interface CatalogoRegulaciones {
  id: number;
  regulacion: string;
  ultima_reforma: Date;
  ficha_tecnica: string;
  descargables: string;
  categoria_id: string;
  fecha_original: Date;
  publicada: Boolean;
}

export default CatalogoRegulaciones;
