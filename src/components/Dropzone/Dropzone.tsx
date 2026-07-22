import { useRef, useState } from "react";
import "./dropzone.css";
import { Icon } from "../Icon/Icon";

export interface DropzoneProps {
  onFiles: (files: File[]) => void;
  /** Filtro do seletor de arquivos, ex: "image/*,.svg". */
  accept?: string;
  multiple?: boolean;
  label?: React.ReactNode;
  /** Segunda linha, menor: formatos aceitos, limite de tamanho. */
  hint?: React.ReactNode;
  icon?: string;
  /** Formato compacto para fileiras de miniaturas. */
  tile?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Dropzone({
  onFiles,
  accept,
  multiple = false,
  label = "Solte um arquivo ou clique para procurar",
  hint,
  icon = "upload",
  tile = false,
  disabled = false,
  className = "",
}: DropzoneProps) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const take = (list: FileList | null) => {
    const files = Array.from(list ?? []);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        "lc-dropzone",
        tile && "lc-dropzone--tile",
        over && "is-over",
        disabled && "lc-dropzone--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        take(e.dataTransfer.files);
      }}
    >
      <Icon name={icon} size={tile ? "sm" : "lg"} />
      <span>{label}</span>
      {hint && !tile ? <span className="lc-dropzone__hint">{hint}</span> : null}

      <input
        ref={inputRef}
        type="file"
        className="lc-dropzone__input"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          take(e.target.files);
          e.target.value = "";
        }}
      />
    </button>
  );
}
