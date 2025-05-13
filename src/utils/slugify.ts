export default function slugify(str: string): string {
    return str
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^\w\s-]/g, "") // remove caracteres especiais
      .trim()
      .replace(/\s+/g, "-") // espaços por hífen
      .toLowerCase();
}