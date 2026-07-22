/** Som generativo de interface: Web Audio puro (osciladores + envelopes), sem
 *  biblioteca externa e sem nenhum arquivo de áudio para carregar.
 *
 *  Portado do SVG_DRAW (`src/features/audio.ts`), que por sua vez espelha o
 *  Grid-o-matic. O comportamento é o mesmo: o AudioContext é criado sob
 *  demanda — navegadores exigem um gesto do usuário — e resume na primeira
 *  chamada real, que sempre acontece dentro de um clique.
 *
 *  Por que os valores não estão em `tokens.json`: eles não são propriedades
 *  CSS. Uma custom property não guarda uma escala de frequências de forma útil,
 *  e ter o mesmo número em dois lugares é pior do que tê-lo num só. Este
 *  arquivo é a fonte para o som. */

/** Escala de duas oitavas, próxima de dó maior. A altura da nota acompanha o
 *  índice recebido, então desenhar vira algo musical em vez de um bipe repetido. */
const SCALE = [
  261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25,
  784, 880, 1046.5, 1174.66, 1318.51, 1568, 1760, 2093,
];

export class SoundEngine {
  private ctx: AudioContext | null = null;
  muted: boolean;

  constructor(muted = false) {
    this.muted = muted;
  }

  setMuted(m: boolean): void {
    this.muted = m;
  }

  /** Cria e resume o contexto sob demanda. Devolve null quando mudo ou
   *  indisponível — todo o resto trata isso como "não toca nada". */
  private async get(): Promise<AudioContext | null> {
    if (this.muted) return null;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!this.ctx) {
      try {
        this.ctx = new AC();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
        return null;
      }
    }
    return this.ctx.state === "running" ? this.ctx : null;
  }

  /** Um oscilador com envelope. `glideTo` varre a altura ao longo da duração. */
  private async blip(
    freq: number,
    dur: number,
    vol: number,
    type: OscillatorType = "sine",
    glideTo?: number,
  ): Promise<void> {
    const ctx = await this.get();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(freq, t);
    if (glideTo != null) osc.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    gain.gain.setValueAtTime(vol, t);
    // Decaimento exponencial: nunca chega a zero, por isso o alvo é 0.001.
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur);
  }

  /** Sequência de notas com atraso próprio. Toda a família de dois tons
   *  (tema, sucesso, erro) sai daqui — antes cada uma repetia o mesmo bloco de
   *  oscilador + envelope. */
  private async seq(
    notes: { freq: number; delay: number; dur: number; vol: number; type?: OscillatorType }[],
  ): Promise<void> {
    const ctx = await this.get();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (const n of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = n.type ?? "triangle";
      osc.frequency.value = n.freq;
      // Ataque de 10ms: sem ele o início da nota estala.
      gain.gain.setValueAtTime(0, t + n.delay);
      gain.gain.linearRampToValueAtTime(n.vol, t + n.delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.delay + n.dur);
      osc.start(t + n.delay);
      osc.stop(t + n.delay + n.dur);
    }
  }

  /** Nota afinada para um elemento criado — o índice escolhe o grau da escala. */
  note(index: number): void {
    const i = ((index % SCALE.length) + SCALE.length) % SCALE.length;
    void this.blip(SCALE[i], 0.3, 0.12, "sine");
  }

  /** Varredura curta descendente, para remoção. */
  erase(): void {
    void this.blip(600, 0.12, 0.1, "sine", 300);
  }

  /** Duas notas para a troca de tema: sobe entrando no escuro, desce no claro. */
  theme(toDark: boolean): void {
    const [a, b] = toDark ? [880, 440] : [440, 880];
    void this.seq([
      { freq: a, delay: 0, dur: 0.18, vol: 0.22 },
      { freq: b, delay: 0.1, dur: 0.22, vol: 0.26 },
    ]);
  }

  /** Estado binário ligado/desligado — Switch, Checkbox. Sobe ao ligar. */
  toggle(on: boolean): void {
    void this.blip(660, 0.09, 0.09, "sine", on ? 990 : 440);
  }

  /** Escolha entre opções — Segmented, Tabs, item de Select. O som mais curto
   *  e discreto do conjunto: acontece com muita frequência. */
  select(): void {
    void this.blip(1046.5, 0.06, 0.06, "triangle");
  }

  /** Uma seção abriu ou fechou — Accordion, Select, Panel. Quase inaudível de
   *  propósito: é pontuação, não anúncio. */
  reveal(open: boolean): void {
    const [from, to] = open ? [420, 700] : [700, 420];
    void this.blip(from, 0.14, 0.05, "sine", to);
  }

  /** Operação concluída. Terça maior ascendente — a resolução mais óbvia que
   *  existe, e por isso a que não precisa ser aprendida. */
  success(): void {
    void this.seq([
      { freq: 659.25, delay: 0, dur: 0.14, vol: 0.16 },
      { freq: 987.77, delay: 0.08, dur: 0.24, vol: 0.18 },
    ]);
  }

  /** Operação falhou. Duas notas graves descendentes em onda quadrada: some
   *  no fundo do espectro em vez de brigar por atenção como um alarme. */
  error(): void {
    void this.seq([
      { freq: 311.13, delay: 0, dur: 0.16, vol: 0.1, type: "square" },
      { freq: 233.08, delay: 0.09, dur: 0.26, vol: 0.11, type: "square" },
    ]);
  }
}

/** Tamanho da escala — útil para derivar índices sem importar SCALE. */
export const SCALE_LENGTH = SCALE.length;
