export default function DeckLayout({ children }: { children: React.ReactNode }) {
  // Isolated — SiteChrome skips Navbar/Footer for /deck routes
  return <>{children}</>;
}
