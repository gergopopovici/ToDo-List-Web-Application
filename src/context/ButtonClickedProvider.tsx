import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ButtonClickedContextType {
  deleteTodoButtonClicked: boolean;
  setDeleteTodoButtonClicked: (value: boolean) => void;
}

const ButtonClickedContext = createContext<ButtonClickedContextType | null>(null);

interface ButtonClickedProviderProps {
  children: ReactNode;
}

function ButtonClickedProvider({ children }: ButtonClickedProviderProps) {
  const [deleteTodoButtonClicked, setDeleteTodoButtonClickedVariable] = useState<boolean>(false);

  const setDeleteTodoButtonClicked = () => {
    setDeleteTodoButtonClickedVariable((prev) => !prev);
  };

  const value = React.useMemo(
    () => ({
      deleteTodoButtonClicked,
      setDeleteTodoButtonClicked,
    }),
    [deleteTodoButtonClicked],
  );

  return <ButtonClickedContext.Provider value={value}>{children}</ButtonClickedContext.Provider>;
}
export default ButtonClickedProvider;

export function useButtonClickedContext() {
  const context = useContext(ButtonClickedContext);
  if (!context) {
    throw new Error('useButtonClickedContext must be used within a ButtonClickedProvider');
  }
  return context;
}
