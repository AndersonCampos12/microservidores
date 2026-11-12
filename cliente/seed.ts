import { fakerES as faker } from "@faker-js/faker";
 
const URL = `http://localhost:${process.env.PORT || 3001}/api/clientes`;
const TOTAL = 1000;
const LOTE = 50; // peticiones enviadas al mismo tiempo
 
const crearDatos = () => ({
  nombre: faker.person.fullName(),
  direccion: faker.location.streetAddress(),
  telefono: "09" + faker.string.numeric(8),
});
 
let ok = 0;
let errores = 0;
const inicio = Date.now();
 
for (let i = 0; i < TOTAL; i += LOTE) {
  const cantidad = Math.min(LOTE, TOTAL - i);
  const respuestas = await Promise.all(
    Array.from({ length: cantidad }, () =>
      fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crearDatos()),
      }).catch(() => null),
    ),
  );
  for (const r of respuestas) r?.ok ? ok++ : errores++;
  console.log(`Enviados ${i + cantidad}/${TOTAL}`);
}
 
console.log(`\nListo: ${ok} creados, ${errores} errores, ${(Date.now() - inicio) / 1000}s`);