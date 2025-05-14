export default function slugify(str: string): string {
    return str
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^\w\s-]/g, "") 
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
}