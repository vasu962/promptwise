import Nav from '/components/Nav';
import Provider from '/components/Provider';
import '/styles/globals.css';

export const metadata = {
  title: 'Promptwise',
  description: 'Discover & Share AI Prompts',
  icons: {
    icon: '/assets/icons/logo.svg',
  },
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
