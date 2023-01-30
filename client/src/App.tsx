import './App.css';
import Header from './components/Header';
import CodesForm from './components/Form';
import CodesList from './components/CodesList';
import { SettingsProvider } from './context/Settings.context';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <SettingsProvider>
      <Header />
      <CodesForm />
      <CodesList />
      <Alert stack={{ limit: 3 }} />
    </SettingsProvider>
  );
}

export default App;
