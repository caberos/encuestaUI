import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-bold text-center mb-4">
        Política de Privacidad
      </h1>

      <p>
        Esta plataforma ha sido desarrollada con fines únicamente estadísticos y
        educativos. No representa ni está afiliada a ningún partido político,
        institución pública o privada.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Recolección de datos</h2>
      <p>La encuesta solicita los siguientes datos mínimos del usuario:</p>
      <ul className="list-disc list-inside">
        <li>Cédula de Identidad (C.I.)</li>
        <li>Edad</li>
        <li>Departamento de residencia</li>
      </ul>
      <p>
        Estos datos se utilizan exclusivamente para fines de control de
        duplicidad y segmentación estadística.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Uso de la información</h2>
      <p>✔ Esta encuesta es anónima.</p>
      <p>✔ No recolectamos información personal como nombre o dirección.</p>
      <p>
        ✔ El número de C.I. es verificado para evitar votos duplicados, pero no
        se almacena en ninguna base de datos pública.{" "}
      </p>
      <p>
        ✔ No se comparte información con terceros ni se usa para publicidad
        personalizada.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        3. Google AdSense y Cookies
      </h2>
      <p>
        Este sitio utiliza Google AdSense para mostrar anuncios relevantes.
        Google, como proveedor externo, puede usar cookies para personalizar los
        anuncios mostrados. Puedes consultar su política en:
      </p>
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        https://policies.google.com/privacy
      </a>

      <h2 className="text-xl font-semibold mt-4">4. Consentimiento</h2>
      <p>
        Al participar en esta encuesta, usted acepta voluntariamente los
        términos de esta política de privacidad.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Contacto</h2>
      <p>
        Si tiene dudas o solicitudes sobre el tratamiento de datos, puede
        contactarnos a través del correo electrónico proporcionado en el sitio
        web.
      </p>

      <p className="mt-4 text-sm text-center text-gray-500">
        Última actualización: mayo de 2025
      </p>
    </div>
  );
}
