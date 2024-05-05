import StoreClosed from "./_components/StoreClosed";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NEXT_PUBLIC_ENABLESHOPPING !== "true") {
    return <StoreClosed />;
  }
  return <>{children}</>;
}
