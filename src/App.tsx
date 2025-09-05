import { useState } from 'react';
import './App.css';
import { FormBuilderLayout, FormListView } from './components';
import { useFormBuilderStore } from './features/form-management/stores/formBuilderStore';
import type { ApiForm } from './types/api';

type AppView = 'list' | 'builder';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('list');
  const { updateFormName, updateElements, clearForm } = useFormBuilderStore();

  const handleCreateNew = () => {
    clearForm();
    setCurrentView('builder');
  };

  const handleEditForm = (form: ApiForm) => {
    updateFormName(form.name);
    updateElements(form.elements);
    setCurrentView('builder');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  if (currentView === 'list') {
    return (
      <FormListView onCreateNew={handleCreateNew} onEditForm={handleEditForm} />
    );
  }

  return (
    <FormBuilderLayout onBackToList={handleBackToList}>
      Form Builder Canvas
    </FormBuilderLayout>
  );
}

export default App;
