# StrikeCTRL

Versión 0.2.0 · by OmT Finance

App web (PWA) que calcula cuánto te cuestan los días de huelga. Lees tus nóminas en PDF (una o varias del
mismo año) y te dice el impacto en cada nómina, en las pagas extra de julio y diciembre y, según lo que
respondas, en pagas adicionales, en la subida salarial y en el bonus. Mismo estilo que las demás apps de
OmT Finance, en rojo brasa y oro.

## Qué lee de las nóminas

Usa el lector de PayCTRL para los recibos SAP (Airbus y similares):

- **5516** «Hrs. conflic. laboral» y **5599** «Hrs. conf. laboral no cot»: horas de huelga, con su mes de
  origen (el de la huelga) y el importe descontado.
- **/398** en negativo con el mismo mes de origen: la cotización que te devuelven (los días de huelga sin
  cotizar no pagan Seguridad Social).
- **0500** «Desc. horas falta p extra»: lo que ya se ha restado de la paga extra.
- **0080 / 0100**, gratificaciones **0414 / 0418 / 0096 / 0098** y **2142** (complemento por resultado):
  sueldo, importe de las extras y % de bonus.

Otras empresas: solo los totales del recibo oficial y las líneas que digan «huelga» o «conflicto laboral».

Los PDF no se guardan: solo los importes que usa el cálculo, en `localStorage` (`strike:*`).

## Cálculo

- **Nóminas:** lo descontado, menos la cotización devuelta y el IRPF que no te retienen (al % de cada
  nómina) = impacto neto.
- **Pagas extra:** julio se genera de enero a junio y diciembre de julio a diciembre. Cada hora de huelga
  del semestre resta paga ÷ (jornada anual ÷ 2); lo ya descontado (0500) se lee y el resto se estima.
- **Preguntas** (por año): días de huelga aún sin descontar, pagas adicionales no previstas (importe y
  meses en que se generan), subida salarial (% y mes desde el que se aplica: se pierden sus atrasos en
  los días de huelga) y bonus (% sobre el salario base × performance, 100 % = objetivo).
- **Ajustes:** horas por día (8), jornada anual (1.680 h), precio hora de huelga y de paga extra
  (automáticos si se dejan vacíos).

## Versiones

Cada cambio sube `APP_VERSION` (app.js), esta línea y la caché de `sw.js`: arreglos 0.1.x, novedades 0.x.0.

## Analítica

Vercel Web Analytics (se activa en la pestaña Analytics del proyecto de Vercel, sin cookies). La app es una sola página, así que cada función se cuenta como una página virtual con `track()` en `app.js`. Solo se envía el nombre de la función, nunca datos de la app, y `beforeSend` (en `index.html`) quita de la dirección lo que va tras `?` o `#`.

