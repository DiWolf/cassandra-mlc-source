export class GenerarFolioProtesta {
    async ejecutar(fecha: Date, totalProtestasMes: number): Promise<string> {
        const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // MM
        const dia = String(fecha.getDate()).padStart(2, "0"); // DD
        const anio = String(fecha.getFullYear()).padStart(2, "0"); // DD
        const consecutivo = (totalProtestasMes + 1).toString().padStart(4, "0"); // Incrementar y formatear

        const folio = `MLC-PR-${dia}/${mes}/${anio}-${consecutivo}`;

        return folio;
    }
}
