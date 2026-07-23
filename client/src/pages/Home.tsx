import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.topbar}>
        <div style={styles.topbarInner}>
          <div style={styles.logoRow}>
            <div style={styles.logoMark}>S</div>
            <span style={styles.brand}>Storefront</span>
          </div>
          <nav style={styles.nav}>
            <span style={styles.navItemActive}>All Products</span>
            <span style={styles.navItem}>Categories</span>
            <span style={styles.navItem}>Deals</span>
          </nav>
          <button style={styles.ctaBtn}>Sign in</button>
        </div>
      </header>

      <div style={styles.container}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.heading}>Products</h1>
            <p style={styles.subheading}>
              {loading
                ? "Loading products..."
                : `${products.length} item${products.length !== 1 ? "s" : ""} available`}
            </p>
          </div>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Live catalog
          </div>
        </div>

        {loading ? (
          <div style={styles.grid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={styles.skeletonCard}>
                <div style={styles.skeletonImage} />
                <div style={styles.skeletonLine} />
                <div style={{ ...styles.skeletonLine, width: "50%" }} />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIconWrap}>
              <span style={styles.emptyIcon}>□</span>
            </div>
            <p style={styles.emptyText}>No products found</p>
            <p style={styles.emptySubtext}>
              Check back later for new arrivals
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map((p) => (
              <div key={p._id} style={styles.cardWrapper}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Storefront, Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "#f8f9fb",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
  },
  topbar: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  topbarInner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    gap: "36px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },
  logoMark: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
  },
  brand: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#111827",
  },
  nav: {
    display: "flex",
    gap: "24px",
    flex: 1,
  },
  navItem: {
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#6b7280",
    cursor: "pointer",
  },
  navItemActive: {
    fontSize: "13.5px",
    fontWeight: 600,
    color: "#4f46e5",
    cursor: "pointer",
  },
  ctaBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#111827",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },
  container: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#111827",
    letterSpacing: "-0.02em",
    margin: 0,
  },
  subheading: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "6px",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12.5px",
    fontWeight: 600,
    color: "#065f46",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    padding: "6px 12px",
    borderRadius: "20px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#10b981",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "20px",
  },
  cardWrapper: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    overflow: "hidden",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  skeletonCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "14px",
  },
  skeletonImage: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "10px",
    background: "#f1f2f4",
    marginBottom: "14px",
  },
  skeletonLine: {
    height: "12px",
    borderRadius: "6px",
    background: "#f1f2f4",
    marginBottom: "8px",
    width: "80%",
  },
  emptyState: {
    textAlign: "center",
    padding: "90px 20px",
    background: "#ffffff",
    border: "1px dashed #d1d5db",
    borderRadius: "14px",
  },
  emptyIconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
  },
  emptyIcon: {
    fontSize: "20px",
    color: "#9ca3af",
  },
  emptyText: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#374151",
    margin: 0,
  },
  emptySubtext: {
    fontSize: "13px",
    color: "#9ca3af",
    marginTop: "4px",
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    padding: "24px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
  },
};

export default Home;