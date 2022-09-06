import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { ContentContextProvider } from './store/content-context';

ReactDOM.render(
  <AuthContextProvider>
    <ContentContextProvider>
      <App />
    </ContentContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
