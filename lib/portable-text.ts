type PortableTextBlock = {
  _type: string;
  children?: Array<{ text?: string }>;
};

export function blocksToText(blocks: unknown): string {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block: PortableTextBlock) => {
      if (!block.children) return "";
      return block.children.map((child) => child.text ?? "").join("");
    })
    .filter(Boolean)
    .join("\n\n");
}
