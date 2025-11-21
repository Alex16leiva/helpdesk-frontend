export class TimeHelper {
    static tiempoTranscurrido(fecha) {
        const pastDate = new Date(fecha);
        const currentDate = new Date();
        const diferenciaMs = currentDate.getTime() - pastDate.getTime();

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30.436875;
        const year = day * 365.25;

        switch (true) {
            case (diferenciaMs < minute):
                {
                    const seconds = Math.floor(diferenciaMs / second);
                    return `hace ${seconds <= 10 ? 'unos segundos' : seconds + ' segundos'}`;
                }
            case (diferenciaMs < hour):
                {
                    const minutes = Math.floor(diferenciaMs / minute);
                    return `hace ${minutes === 1 ? 'un minuto' : minutes + ' minutos'}`;
                }
            case (diferenciaMs < day):
                {
                    const horas = Math.floor(diferenciaMs / hour);
                    return `hace ${horas === 1 ? 'una hora' : horas + ' horas'}`;
                }
            case (diferenciaMs < week):
                {
                    const dias = Math.floor(diferenciaMs / day);
                    return `hace ${dias === 1 ? 'un día' : dias + ' días'}`;
                }
            case (diferenciaMs < month):
                {
                    const semanas = Math.floor(diferenciaMs / week);
                    return `hace ${semanas === 1 ? 'una semana' : semanas + ' semanas'}`;
                }
            case (diferenciaMs < year):
                {
                    const meses = Math.floor(diferenciaMs / month);
                    return `hace ${meses === 1 ? 'un mes' : meses + ' meses'}`;
                }
            default:
                {
                    const años = Math.floor(diferenciaMs / year);
                    return `hace ${años === 1 ? 'un año' : años + ' años'}`;
                }
        }
    }

    static formatearFecha(fechaISO) {
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-ES', opciones);
    }

    /**
     * Formatea una fecha en el formato "YYYY-MM-DD HH:mm".
     *
     * @param {Date} date - La fecha a formatear.
     * @returns {string} La fecha formateada.
     *
     * @example
     * const fechaActual = new Date();
     * const fechaFormateada = formatearFechaCorta(fechaActual);
     * console.log(fechaFormateada); // "2025-02-10 14:30"
     */
    static formatearFechaCorta(dateInput) {
        if (dateInput === null || dateInput === undefined) return "";

        const date = (dateInput instanceof Date) ? dateInput : new Date(dateInput);

        if (isNaN(date.getTime())) {
            return "";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}

