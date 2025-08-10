function generarEnlaceWhatsApp(numero, mensaje = "") {
    const textoCodificado = encodeURIComponent(mensaje);
    const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return esMovil 
        ? `whatsapp://send?phone=${numero}${mensaje ? `&text=${textoCodificado}` : ""}`
        : `https://wa.me/${numero}${mensaje ? `?text=${textoCodificado}` : ""}`;
}

export function generarEnlaceWhatsApp(numero, mensaje = "") {
    const textoCodificado = encodeURIComponent(mensaje);
    return `https://wa.me/${numero}${mensaje ? `?text=${textoCodificado}` : ""}`;
}