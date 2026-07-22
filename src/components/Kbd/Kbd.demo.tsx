import { Kbd } from "./Kbd";

export default function KbdDemo() {
  return (
    <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
      <div>Alternar modo <Kbd>m</Kbd></div>
      <div>Limpar tela <Kbd>c</Kbd></div>
      <div>Desfazer <Kbd>⌘Z</Kbd></div>
      <div style={{ fontSize: 20 }}>O badge acompanha a fonte <Kbd>a</Kbd></div>
      <div style={{ fontSize: 11 }}>…em qualquer tamanho <Kbd>a</Kbd></div>
    </div>
  );
}
