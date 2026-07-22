import { useCallback, useEffect, useState } from "react";
import { SoundEngine } from "./audio";

/** Um motor por página. Vários componentes chamando o hook compartilham o mesmo
 *  AudioContext — abrir um contexto por componente estouraria o limite do
 *  navegador em poucas dezenas. */
const engine = new SoundEngine(true);

const KEY = "lacto-muted";

const readMuted = () => localStorage.getItem(KEY) !== "0";

export interface UseSoundOptions {
  /** Estado inicial quando nada foi salvo ainda. Padrão: mudo. */
  defaultMuted?: boolean;
}

/**
 * Som de interface com a preferência guardada, do mesmo jeito que o tema.
 *
 * **Começa mudo por padrão.** Som que toca sem ser pedido é hostil, e o
 * navegador bloquearia o primeiro som de qualquer forma — não há gesto do
 * usuário antes do primeiro clique.
 */
export function useSound({ defaultMuted = true }: UseSoundOptions = {}) {
  const [muted, setMuted] = useState<boolean>(() =>
    localStorage.getItem(KEY) === null ? defaultMuted : readMuted(),
  );

  useEffect(() => {
    engine.setMuted(muted);
    localStorage.setItem(KEY, muted ? "1" : "0");
  }, [muted]);

  return {
    muted,
    setMuted,
    /** Nota afinada; o índice escolhe o grau da escala. */
    note: useCallback((index: number) => engine.note(index), []),
    /** Varredura descendente, para remoção. */
    erase: useCallback(() => engine.erase(), []),
    /** Duas notas para a troca de tema. */
    theme: useCallback((toDark: boolean) => engine.theme(toDark), []),
    /** Estado binário ligado/desligado. */
    toggle: useCallback((on: boolean) => engine.toggle(on), []),
    /** Escolha entre opções. */
    select: useCallback(() => engine.select(), []),
    /** Uma seção abriu ou fechou. */
    reveal: useCallback((open: boolean) => engine.reveal(open), []),
    /** Operação concluída. */
    success: useCallback(() => engine.success(), []),
    /** Operação falhou. */
    error: useCallback(() => engine.error(), []),
  };
}
