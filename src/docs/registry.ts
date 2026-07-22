/** Registro do site: para cada componente, o README nos dois idiomas e a demo
 *  interativa. Adicionar um componente = uma linha em COMPONENTS. */
import type { ComponentType } from "react";
import type { Lang, StringKey } from "./i18n";

import IconEn from "../components/Icon/README.md?raw";
import IconPt from "../components/Icon/README.pt-BR.md?raw";
import ButtonEn from "../components/Button/README.md?raw";
import ButtonPt from "../components/Button/README.pt-BR.md?raw";
import IconButtonEn from "../components/IconButton/README.md?raw";
import IconButtonPt from "../components/IconButton/README.pt-BR.md?raw";
import KbdEn from "../components/Kbd/README.md?raw";
import KbdPt from "../components/Kbd/README.pt-BR.md?raw";
import TooltipEn from "../components/Tooltip/README.md?raw";
import TooltipPt from "../components/Tooltip/README.pt-BR.md?raw";
import SwitchEn from "../components/Switch/README.md?raw";
import SwitchPt from "../components/Switch/README.pt-BR.md?raw";
import CheckboxEn from "../components/Checkbox/README.md?raw";
import CheckboxPt from "../components/Checkbox/README.pt-BR.md?raw";
import RadioEn from "../components/Radio/README.md?raw";
import RadioPt from "../components/Radio/README.pt-BR.md?raw";
import SegmentedEn from "../components/Segmented/README.md?raw";
import SegmentedPt from "../components/Segmented/README.pt-BR.md?raw";
import SliderEn from "../components/Slider/README.md?raw";
import SliderPt from "../components/Slider/README.pt-BR.md?raw";
import RangeSliderEn from "../components/RangeSlider/README.md?raw";
import RangeSliderPt from "../components/RangeSlider/README.pt-BR.md?raw";
import SelectEn from "../components/Select/README.md?raw";
import SelectPt from "../components/Select/README.pt-BR.md?raw";
import TextFieldEn from "../components/TextField/README.md?raw";
import TextFieldPt from "../components/TextField/README.pt-BR.md?raw";
import NumberFieldEn from "../components/NumberField/README.md?raw";
import NumberFieldPt from "../components/NumberField/README.pt-BR.md?raw";
import ColorSwatchEn from "../components/ColorSwatch/README.md?raw";
import ColorSwatchPt from "../components/ColorSwatch/README.pt-BR.md?raw";
import PanelEn from "../components/Panel/README.md?raw";
import PanelPt from "../components/Panel/README.pt-BR.md?raw";
import SidebarEn from "../components/Sidebar/README.md?raw";
import SidebarPt from "../components/Sidebar/README.pt-BR.md?raw";
import AccordionEn from "../components/Accordion/README.md?raw";
import AccordionPt from "../components/Accordion/README.pt-BR.md?raw";
import DividerEn from "../components/Divider/README.md?raw";
import DividerPt from "../components/Divider/README.pt-BR.md?raw";
import TabsEn from "../components/Tabs/README.md?raw";
import TabsPt from "../components/Tabs/README.pt-BR.md?raw";
import ToastEn from "../components/Toast/README.md?raw";
import ToastPt from "../components/Toast/README.pt-BR.md?raw";
import DropzoneEn from "../components/Dropzone/README.md?raw";
import DropzonePt from "../components/Dropzone/README.pt-BR.md?raw";
import BadgeEn from "../components/Badge/README.md?raw";
import BadgePt from "../components/Badge/README.pt-BR.md?raw";

import IconDemo from "../components/Icon/Icon.demo";
import ButtonDemo from "../components/Button/Button.demo";
import IconButtonDemo from "../components/IconButton/IconButton.demo";
import KbdDemo from "../components/Kbd/Kbd.demo";
import TooltipDemo from "../components/Tooltip/Tooltip.demo";
import SwitchDemo from "../components/Switch/Switch.demo";
import CheckboxDemo from "../components/Checkbox/Checkbox.demo";
import RadioDemo from "../components/Radio/Radio.demo";
import SegmentedDemo from "../components/Segmented/Segmented.demo";
import SliderDemo from "../components/Slider/Slider.demo";
import RangeSliderDemo from "../components/RangeSlider/RangeSlider.demo";
import SelectDemo from "../components/Select/Select.demo";
import TextFieldDemo from "../components/TextField/TextField.demo";
import NumberFieldDemo from "../components/NumberField/NumberField.demo";
import ColorSwatchDemo from "../components/ColorSwatch/ColorSwatch.demo";
import PanelDemo from "../components/Panel/Panel.demo";
import SidebarDemo from "../components/Sidebar/Sidebar.demo";
import AccordionDemo from "../components/Accordion/Accordion.demo";
import DividerDemo from "../components/Divider/Divider.demo";
import TabsDemo from "../components/Tabs/Tabs.demo";
import ToastDemo from "../components/Toast/Toast.demo";
import DropzoneDemo from "../components/Dropzone/Dropzone.demo";
import BadgeDemo from "../components/Badge/Badge.demo";

/** Texto disponível nos dois idiomas. */
export type Bilingual = Record<Lang, string>;

const both = (en: string, pt: string): Bilingual => ({ en, "pt-BR": pt });

export type GroupId = "action" | "input" | "selection" | "structure" | "feedback";

export interface Entry {
  slug: string;
  name: string;
  group: GroupId;
  md: Bilingual;
  Demo: ComponentType;
  /** Criado no Lacto, não herdado dos repositórios de origem. */
  isNew?: boolean;
}

export const COMPONENTS: Entry[] = [
  { slug: "icon", name: "Icon", group: "action", md: both(IconEn, IconPt), Demo: IconDemo },
  { slug: "button", name: "Button", group: "action", md: both(ButtonEn, ButtonPt), Demo: ButtonDemo },
  { slug: "icon-button", name: "IconButton", group: "action", md: both(IconButtonEn, IconButtonPt), Demo: IconButtonDemo },
  { slug: "kbd", name: "Kbd", group: "action", md: both(KbdEn, KbdPt), Demo: KbdDemo },

  { slug: "text-field", name: "TextField", group: "input", md: both(TextFieldEn, TextFieldPt), Demo: TextFieldDemo },
  { slug: "number-field", name: "NumberField", group: "input", md: both(NumberFieldEn, NumberFieldPt), Demo: NumberFieldDemo },
  { slug: "slider", name: "Slider", group: "input", md: both(SliderEn, SliderPt), Demo: SliderDemo },
  { slug: "range-slider", name: "RangeSlider", group: "input", md: both(RangeSliderEn, RangeSliderPt), Demo: RangeSliderDemo },
  { slug: "color-swatch", name: "ColorSwatch", group: "input", md: both(ColorSwatchEn, ColorSwatchPt), Demo: ColorSwatchDemo },
  { slug: "dropzone", name: "Dropzone", group: "input", md: both(DropzoneEn, DropzonePt), Demo: DropzoneDemo },

  { slug: "switch", name: "Switch", group: "selection", md: both(SwitchEn, SwitchPt), Demo: SwitchDemo },
  { slug: "checkbox", name: "Checkbox", group: "selection", md: both(CheckboxEn, CheckboxPt), Demo: CheckboxDemo, isNew: true },
  { slug: "radio", name: "RadioGroup", group: "selection", md: both(RadioEn, RadioPt), Demo: RadioDemo, isNew: true },
  { slug: "segmented", name: "Segmented", group: "selection", md: both(SegmentedEn, SegmentedPt), Demo: SegmentedDemo },
  { slug: "select", name: "Select", group: "selection", md: both(SelectEn, SelectPt), Demo: SelectDemo },

  { slug: "panel", name: "Panel", group: "structure", md: both(PanelEn, PanelPt), Demo: PanelDemo },
  { slug: "sidebar", name: "Sidebar", group: "structure", md: both(SidebarEn, SidebarPt), Demo: SidebarDemo },
  { slug: "accordion", name: "Accordion", group: "structure", md: both(AccordionEn, AccordionPt), Demo: AccordionDemo },
  { slug: "tabs", name: "Tabs", group: "structure", md: both(TabsEn, TabsPt), Demo: TabsDemo },
  { slug: "divider", name: "Divider", group: "structure", md: both(DividerEn, DividerPt), Demo: DividerDemo },

  { slug: "tooltip", name: "Tooltip", group: "feedback", md: both(TooltipEn, TooltipPt), Demo: TooltipDemo },
  { slug: "toast", name: "Toast", group: "feedback", md: both(ToastEn, ToastPt), Demo: ToastDemo },
  { slug: "badge", name: "Badge", group: "feedback", md: both(BadgeEn, BadgePt), Demo: BadgeDemo },
];

export const GROUPS: GroupId[] = ["action", "input", "selection", "structure", "feedback"];

/* ── Fundamentos ─────────────────────────────────────────────────────────── */
import colorsEn from "./pages/foundations/colors.md?raw";
import colorsPt from "./pages/foundations/colors.pt-BR.md?raw";
import typographyEn from "./pages/foundations/typography.md?raw";
import typographyPt from "./pages/foundations/typography.pt-BR.md?raw";
import spacingEn from "./pages/foundations/spacing.md?raw";
import spacingPt from "./pages/foundations/spacing.pt-BR.md?raw";
import motionEn from "./pages/foundations/motion.md?raw";
import motionPt from "./pages/foundations/motion.pt-BR.md?raw";
import iconsEn from "./pages/foundations/icons.md?raw";
import iconsPt from "./pages/foundations/icons.pt-BR.md?raw";
import soundEn from "./pages/foundations/sound.md?raw";
import soundPt from "./pages/foundations/sound.pt-BR.md?raw";
import tokensEn from "./pages/foundations/tokens.md?raw";
import tokensPt from "./pages/foundations/tokens.pt-BR.md?raw";

export interface Foundation {
  slug: string;
  /** Chave no dicionário de i18n para o nome da página. */
  key: StringKey;
  md: Bilingual;
}

export const FOUNDATIONS: Foundation[] = [
  { slug: "colors", key: "colors", md: both(colorsEn, colorsPt) },
  { slug: "typography", key: "typography", md: both(typographyEn, typographyPt) },
  { slug: "spacing", key: "spacing", md: both(spacingEn, spacingPt) },
  { slug: "motion", key: "motion", md: both(motionEn, motionPt) },
  { slug: "icons", key: "icons", md: both(iconsEn, iconsPt) },
  { slug: "sound", key: "sound", md: both(soundEn, soundPt) },
  { slug: "tokens", key: "tokens", md: both(tokensEn, tokensPt) },
];

/* ── Páginas soltas ──────────────────────────────────────────────────────── */
import homeEn from "./pages/home.md?raw";
import homePt from "./pages/home.pt-BR.md?raw";
import backlogEn from "./pages/backlog.md?raw";
import backlogPt from "./pages/backlog.pt-BR.md?raw";

export const HOME = both(homeEn, homePt);
export const BACKLOG = both(backlogEn, backlogPt);
