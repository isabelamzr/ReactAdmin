import { createContext, useState, useContext } from 'react' 

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('/');
  
    return (
      <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
        {children}
      </NavigationContext.Provider>
    );
  };
  
  export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
      throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
  };