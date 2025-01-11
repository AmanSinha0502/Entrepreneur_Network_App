// App.tsx
import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import SplashScreenComponent from './src/screens/extraPages/SplashScreen';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
}, []);

  if(isLoading){
    return <SplashScreenComponent />;
  }

  return(
    <AppNavigator />
  )
}
