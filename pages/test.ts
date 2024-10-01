type T = "" | keyof HTMLElementTagNameMap;
type S = T | `${T}#${string}` | `${T}.${string}` | `${T}#${string}.${string}`;
type ElFunction = (selector: S, ...c: any[]) => any;

export default function test<El extends ElFunction>(el: El) {
  return el("div", el("span", "Hello, World!"), el("img", { src: "test" }));
}
