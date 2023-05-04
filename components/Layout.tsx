import Header from './Header';
import Footer from './Footer';

// @ts-ignore
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}