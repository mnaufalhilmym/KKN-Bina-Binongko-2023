export function calculateEl({
  size,
  cardSize,
  cardGap,
}: {
  size: number;
  cardSize: number;
  cardGap: number;
}) {
  const col = Math.floor(size / cardSize);
  if (size - col * cardSize - (col - 1) * cardGap < 0) {
    return col - 1;
  }
  return col;
}

export function calculateBlogElCol({ width }: { width: number }) {
  if (width > 1024) return 3;
  if (width > 768) return 2;
  return 1;
}
