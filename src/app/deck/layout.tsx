export default function DeckLayout({ children }: { children: React.ReactNode }) {
  // Isolated layout — no navbar, no footer, no GlassBackground
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0e1a", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
