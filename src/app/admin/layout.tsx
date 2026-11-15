export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-gradient-to-br from-wave-black to-gray-900">
        {children}
      </body>
    </html>
  );
}
