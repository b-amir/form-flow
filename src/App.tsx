import './App.css';
import {
  FormBuilderPanel,
  FormPreviewPanel,
  FormsListPanel,
  Layout,
} from './components/layout';

const App = () => {
  return (
    <Layout
      formsListPanel={<FormsListPanel />}
      formBuilderPanel={<FormBuilderPanel />}
      formPreviewPanel={<FormPreviewPanel />}
    />
  );
};

export default App;
